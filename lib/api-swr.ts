import { request, gql } from 'graphql-request';
import useSWR from 'swr';
import { MenuLinks, FormattedMenuLinks, RawMenuLinksFromGraphQL, RawMenuLinkAttributeFromGraphQL } from '../types/types';

const API_URL = process.env.WORDPRESS_API_URL;

function fetchAPI(gql: string) {
  const fetcher = (query: string) => request(API_URL, query);
  const { data, error } = useSWR(gql, fetcher);

  return data;
}

export function getMenuLinks(formatted : boolean = false) {
  let data : any = fetchAPI(gql`
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

export function getHomeBannerData() {
  const data = fetchAPI(gql`
    query GetHomeBanner {
      pages(where: {title: "Home"}) {
        nodes {
          frontPage {}
        }
      }
    }
  `);
}

export function getData() {
  const data : any = fetchAPI(gql`
    query GetFrontPage {
      pages(where: {title: "Home"}) {
        nodes {
          frontPage {
            servicesContent {
              healthcareShortDescription
              internationalAdmissionsShotDescription
            }
            whatWeDoContent {
              companyTagline
              whatWeDoDescription
            }
          }
        }
      }
    }
  `)

  return data
}

export function getHomeData() {
  const data : any = fetchAPI(gql`
    query getHomeData {
      pages(where: {title: "Home"}) {
        nodes {
          home {
            collegeFund
            collegesAndUniversities
            countries
            fieldGroupName
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
  `);

  if (data) {
    return data.pages.nodes[0].home;
  }
}

function formatURL(url: string) {
  return url.replace("https://dev-future-connect.pantheonsite.io/", "https://futureconnect.one/");
}

function removeExtraBoilerplateOnMenuLinks(data: RawMenuLinksFromGraphQL) {
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

