import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EndpointFunctionsClient = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SAVE_BOOK: () => string;
  GET_BOOKS: () => string;
  LOGIN: (id: number | string) => string;
};

export const API_SERVICE: EndpointFunctionsClient = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/search`,
  SAVE_BOOK: () => `/users/library`,
  GET_BOOKS: () => `/users/library`,
  LOGIN: (id) => `/login/${id}`,
};

export type EndpointFunctionsServer = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SINGLE: (id: number | string) => string;
  LOGIN: (id: number | string) => string;
  FRIENDS_CURR_READING: () => string;
  SAVE_BOOK: () => string;
  REMOVE_BOOK: () => string;
  GET_BOOK: () => string;
};

export const AGGREGATE_SERVICE: EndpointFunctionsServer = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/book/search`,
  SAVE_BOOK: () => `/users/library`,
  REMOVE_BOOK: () => `/users/library`,
  GET_BOOK: () => `/users/library`,
  FRIENDS_CURR_READING: () => `/users/friends`,
  SINGLE: (id) => `/users/${id}`,
  LOGIN: (id) => `/login/${id}`,
};
