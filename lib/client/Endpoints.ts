type EndpointFunctions = {
  ROOT: () => string;
  BOOK_SEARCH: () => string;
  SINGLE: (id: number | string) => string;
  LOGIN: (id: number | string) => string;

  // ... Add other endpoints as needed
};

export const API_SERVICE: EndpointFunctions = {
  ROOT: () => "/",
  BOOK_SEARCH: () => `/book/search`, // TODO: Add query params
  SINGLE: (id) => `/users/${id}`,
  LOGIN: (id) => `/login/${id}`,
  // ... Add other endpoints as needed
};
