export interface MenusRoot {
  menus: Menus
}

export interface Menus {
  nodes: MenusNode[]
}

export interface MenusNode {
  id: string,
  databaseId: number,
  name: string,
  menuItems: MenuItems
}

export interface MenuItems {
  edges: Edge[]
}

export interface Edge {
  node: MenuLinkAttributes
}

export interface MenuLinkAttributes {
  id: string,
  label: string,
  parentId: string|null,
  url: string
  children?: MenuLinkAttributes[];
}

export type MenuLinkList = MenuLinks[];

export interface MenuLinks {
  menuLinks: MenuLinkAttributes[]
}

export type FormattedMenuLinks = MenuLinkAttributes[];

export interface RawMenuLinkAttributeFromGraphQL {
  node: {
    id: string
    label: string
    url: string
    parentId: string|null
  }
}

export type RawMenuLinksFromGraphQL = RawMenuLinkAttributeFromGraphQL[];

export interface FrontPageContent {
  collegeFund: number
  collegesAndUniversities: number
  countries: number
  healthcareDescription: string
  intlAdmissionDescription: string
  missionStatement: string
  tagline: string
  title: string
  whatWeDoDescription: string
}

export interface FormPost {
  firstName: string
  lastName: string
  email: string
  category: string
}