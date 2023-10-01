import { z } from "zod";

export const saveUserBookSchema = z.object({
  isbn10: z.string().nullable(),
  isbn13: z.string().nullable(),
});

export const deleteUserBookSchema = z.object({
  book_id: z.string(),
});
