import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EndpointFunctionsClient = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SINGLE: (id: number | string) => string;
  LOGIN: (id: number | string) => string;

  // ... Add other endpoints as needed
};

export const API_SERVICE: EndpointFunctionsClient = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/search`,
  SINGLE: (id) => `/users/${id}`,
  LOGIN: (id) => `/login/${id}`,
  // ... Add other endpoints as needed
};

export type EndpointFunctionsServer = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SINGLE: (id: number | string) => string;
  LOGIN: (id: number | string) => string;
  SAVE_BOOK: () => string;
};

export const AGGREGATE_SERVICE: EndpointFunctionsServer = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/book/search`,
  SAVE_BOOK: () => `/users/library`,
  SINGLE: (id) => `/users/${id}`,
  LOGIN: (id) => `/login/${id}`,
};
