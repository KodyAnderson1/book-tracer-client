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
  FRIENDS: () => string;
};

export const API_SERVICE: EndpointFunctionsClient = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/search`,
  SAVE_BOOK: () => `/users/library`,
  GET_BOOKS: () => `/users/library`,
  LOGIN: (id) => `/login/${id}`,
  FRIENDS: () => `/friends`,
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
  NEW_USER: () => string;
  GET_BADGES: () => string;
  GET_CHALLENGES: () => string;
  GET_LATEST_ACHIEVEMENTS: () => string;
  GET_POINTS: () => string;
  GET_SINGLE_BOOK_STATS: () => string;
  GET_LEADERBOARD: () => string;
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
  NEW_USER: () => `/users/signup`,
  GET_BADGES: () => `/gamification/badges`,
  GET_CHALLENGES: () => `/gamification/challenge`,
  GET_LATEST_ACHIEVEMENTS: () => `/gamification/achievements`,
  GET_POINTS: () => `/gamification/points`,
  GET_SINGLE_BOOK_STATS: () => `/gamification/stats/singlebook`,
  GET_LEADERBOARD: () => `/gamification/leaderboard`,
};
