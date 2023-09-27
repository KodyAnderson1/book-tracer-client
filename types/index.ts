import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EndpointFunctionsClient = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SAVE_BOOK: () => string;
  LOGIN: (id: number | string) => string;
};

export const API_SERVICE: EndpointFunctionsClient = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/search`,
  SAVE_BOOK: () => `/users/library`,
  LOGIN: (id) => `/login/${id}`,
};

export type EndpointFunctionsServer = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SINGLE: (id: number | string) => string;
  LOGIN: (id: number | string) => string;
  SAVE_BOOK: () => string;
  REMOVE_BOOK: () => string;
};

export const AGGREGATE_SERVICE: EndpointFunctionsServer = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/book/search`,
  SAVE_BOOK: () => `/users/library`,
  REMOVE_BOOK: () => `/users/library`,
  SINGLE: (id) => `/users/${id}`,
  LOGIN: (id) => `/login/${id}`,
};
