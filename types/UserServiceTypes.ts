export interface SaveBook {
  clerkId?: string;
  isbn10: string | null;
  isbn13: string | null;
}

export interface SaveBookResponse {
  id: string;
}
