export interface NavigationLink {
  name: string;
  path: string;
}

export interface NavigationSection {
  name?: string;
  subItems?: NavigationLink[];
  links?: NavigationLink[];
}

export interface NavigationCTA {
  name: string;
  path: string;
  variant: string;
}

export interface NavigationData {
  [key: string]: NavigationSection[] | NavigationCTA;
} 