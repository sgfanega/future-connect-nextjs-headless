import { MenuLinkAttributes,FormattedMenuLinks, MenuLinkList, MenuLinks, RawMenuLinksFromGraphQL, RawMenuLinkAttributeFromGraphQL } from '../types/types';

const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}

export async function getMenuLinks(formatted : boolean = false) {
  let data = await fetchAPI(`
  query menuLinks {
    menus {
      nodes {
        id
        databaseId
        name
        menuItems {
          edges {
            node {
              id
              label
              url
              parentId
            }
          }
        }
      }
    }
  }
  `);

  if (data) {
    data = data.menus.nodes[0].menuItems.edges;

    const noBoilerplateData = removeExtraBoilerplateOnMenuLinks(data);

    if (formatted) {
      return formatMenuLinksWithChildren(noBoilerplateData);
    }

    return noBoilerplateData;
  }
}

export async function getFrontPageContent() {
  const data = await fetchAPI(`
  query getFrontPageContent {
    pages(where: {title: "Home"}) {
      nodes {
        home {
          collegeFund
          collegesAndUniversities
          countries
          healthcareDescription
          intlAdmissionDescription
          missionStatement
          tagline
          title
          whatWeDoDescription
        }
      }
    }
  }
  `)

  if (data) {
    return data.pages.nodes[0].home
  }
}

function formatURL(url: string) {
  return url.replace("https://dev-future-connect.pantheonsite.io/", "/");
}

function removeExtraBoilerplateOnMenuLinks(data : RawMenuLinksFromGraphQL) {
  const formattedData = data?.map((link : RawMenuLinkAttributeFromGraphQL) => [{
    id: link.node.id,
    label: link.node.label,
    url: formatURL(link.node.url),
    parentId: link.node.parentId
  }]);

  return formattedData?.flat();
}

function formatMenuLinksWithChildren(data: FormattedMenuLinks) {
  const items = {};
  const result = [];

  // Create a mapping of items by ID
  data.forEach(item => {
    item.children = [];
    items[item.id] = item;
  });

  // Organize items into parent-child relationships
  data.forEach(item => {
    if (item.parentId !== null) {
      items[item.parentId].children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}
