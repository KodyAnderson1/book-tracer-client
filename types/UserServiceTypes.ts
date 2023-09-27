export interface SaveBook {
  clerkId: string;
  isbn_10: string | null;
  isbn_13: string | null;
}

export interface SaveBookResponse {
  id: string;
}
