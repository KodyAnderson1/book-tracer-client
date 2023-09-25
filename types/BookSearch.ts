export interface BookSearchResult {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: volumeInfo;
  searchInfo: searchInfo;
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
