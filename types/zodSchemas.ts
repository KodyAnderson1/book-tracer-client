import { z } from "zod";

export const deleteUserBookSchema = z.object({
  book_id: z.string(),
});

export const industryIdentifiers = z.object({
  type: z.string(),
  identifier: z.string(),
});

export const ImageLinks = z.object({
  smallThumbnail: z.string(),
  thumbnail: z.string(),
});

export const volumeInfo = z.object({
  title: z.string(),
  subtitle: z.string(),
  authors: z.array(z.string()),
  publisher: z.string(),
  publishedDate: z.string(),
  description: z.string(),
  industryIdentifiers: z.array(industryIdentifiers),
  pageCount: z.number(),
  averageRating: z.number(),
  ratingsCount: z.number(),
  printType: z.string(),
  categories: z.array(z.string()),
  maturityRating: z.string(),
  imageLinks: ImageLinks,
  language: z.string(),
  previewLink: z.string(),
  infoLink: z.string(),
  canonicalVolumeLink: z.string(),
});

export const searchInfo = z.object({
  textSnippet: z.string(),
});

export const BookSearchResultSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: volumeInfo.optional(),
  searchInfo: searchInfo.optional(),
  isInLibrary: z.boolean().optional(),
});

export const LibraryBooks = BookSearchResultSchema.extend({
  reading_status: z.string(),
  last_page_read: z.number(),
  last_reading_update: z.string(),
});

/************************************************************ */
export const UserLibraryWithBookDetailsSchema = z.object({
  book_id: z.string(),
  api_id: z.string(),
  title: z.string(),
  author: z.array(z.string()),
  publisher: z.string(),
  published_date: z.string(),
  description: z.string(),
  isbn_10: z.string().nullable(),
  isbn_13: z.string().nullable(),
  page_count: z.number().nullable(),
  print_type: z.string().nullable(),
  categories: z.array(z.string()),
  average_rating: z.number().nullable(),
  ratings_count: z.number().nullable(),
  maturity_rating: z.string().nullable(),
  small_thumbnail: z.string().nullable(),
  thumbnail: z.string().nullable(),
  reading_status: z.string(),
  last_page_read: z.number().nullable(),
  last_reading_update: z.string().nullable(),
  inLibrary: z.boolean(),
});

export const CustomUserSchema = z.object({
  clerkId: z.string(),
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export const SearchSchema = z.object({
  searchString: z.string().nonempty(),
});

export const UpdateProgressSchema = z.object({
  clerkId: z.string(),
  bookId: z.string(),
  currentPage: z.number(),
});
