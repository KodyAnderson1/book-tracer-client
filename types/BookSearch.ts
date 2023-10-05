export interface BookSearchResult {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo?: volumeInfo;
  searchInfo?: searchInfo;
  inLibrary?: boolean;
}

export interface LibraryBooks extends BookSearchResult {
  reading_status: string;
  last_page_read: number;
  last_reading_update: string;
}

interface searchInfo {
  textSnippet: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface industryIdentifiers {
  type: string;
  identifier: string;
}

interface volumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: industryIdentifiers[];

  pageCount: number;
  averageRating: number;
  ratingsCount: number;

  printType: string;
  categories: string[];
  maturityRating: string;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

/**********************************************/

export interface UserLibraryWithBookDetails {
  book_id: string;
  api_id: string;
  title: string;
  author: string[];
  publisher: string;
  published_date: string;
  description: string;
  isbn_10: string;
  isbn_13: string;
  page_count: number | null;
  print_type: string;
  categories: string[];
  average_rating: number | null;
  ratings_count: number | null;
  maturity_rating: string;
  small_thumbnail: string;
  thumbnail: string;
  reading_status: string;
  last_page_read: number | null;
  last_reading_update: string | null;
  inLibrary: boolean;
}
