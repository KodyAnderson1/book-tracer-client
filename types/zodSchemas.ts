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
  author: z.array(z.string()).nullable(),
  publisher: z.string(),
  published_date: z.string(),
  description: z.string().nullable(),
  isbn_10: z.string().nullable(),
  isbn_13: z.string().nullable(),
  page_count: z.number().nullable(),
  print_type: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
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
  pagesRead: z.number(),
  action: z.union([
    z.literal("STARTED_BOOK"),
    z.literal("READ_PAGES"),
    z.literal("COMPLETED_BOOK"),
  ]),
});

/**********************************  */
export const DateProgressSchema = z.object({
  progress: z.number(),
  daysCompleted: z.number(),
  daysRemaining: z.number(),
});

export const AdditionalInfoSchema = z.object({
  done: z.number(),
  toGo: z.number(),
  percentComplete: z.number(),
});

export const ChallengeSchema = z.object({
  id: z.number(),
  userChallengeId: z.number(),
  name: z.string(),
  description: z.string(),
  frequency: z.union([
    z.literal("DAILY"),
    z.literal("WEEKLY"),
    z.literal("MONTHLY"),
    z.literal("YEARLY"),
  ]),
  type: z.union([z.literal("STREAK"), z.literal("PAGES"), z.literal("BOOKS")]),
  threshold: z.number(),
  challengeStartDate: z.union([z.string().nullable(), z.null()]),
  challengeEndDate: z.union([z.string().nullable(), z.null()]),
  pointsAwarded: z.number(),
  userChallengeStartDate: z.union([z.string().nullable(), z.null()]),
  userChallengeEndDate: z.union([z.string().nullable(), z.null()]),
  status: z.union([z.literal("STARTED_CHALLENGE"), z.null()]),
  dateProgress: z.union([DateProgressSchema, z.null()]),
  additionalInfo: z.union([AdditionalInfoSchema, z.null()]),
});

export const ChallengesSchema = z.array(ChallengeSchema);

export const Badge = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  threshold: z.number(),
  type: z.enum([
    "PAGES",
    "ENGAGEMENT",
    "COMPLETION",
    "STREAK",
    "FRIENDS",
    "CHALLENGES",
    "COLLECTOR",
    "BOOKS",
  ]),
  tier: z.number(),
  imageUrl: z.string(),
  pointsAwarded: z.number(),
  dateEarned: z.union([z.string().nullable(), z.null()]),
  additionalBadgeInfo: z.union([AdditionalInfoSchema, z.null()]),
});

export const BadgeResponse = z.object({
  Pages: z.array(Badge),
  Engagement: z.array(Badge),
  Completion: z.array(Badge),
  Streak: z.array(Badge),
  Friends: z.array(Badge),
  Challenges: z.array(Badge),
  Collector: z.array(Badge),
  Books: z.array(Badge),
});

export const BadgeType = z.enum([
  "Pages",
  "Friends",
  "Streak",
  "Books",
  "Engagement",
  "Collector",
  "Completion",
  "Challenges",
]);

export const ActivityAction = z.enum([
  "STARTED_BOOK",
  "COMPLETED_BOOK",
  "ADDED_BOOK",
  "DELETED_BOOK",
  "STARTED_CHALLENGE",
  "COMPLETED_CHALLENGE",
  "FAILED_CHALLENGE",
  "ABANDONED_CHALLENGE",
  "EARNED_BADGE",
  "EARNED_POINTS",
  "READ_PAGES",
]);

export const ChallengeFrequency = z.enum(["Daily", "Weekly", "Monthly", "Yearly"]);

export const AdditionalStatus = z.object({
  statusCode: z.string(),
  statusDescription: z.string(),
});

export const AdditionalChallengeInfo = z.object({
  done: z.number(),
  toGo: z.number(),
  percentComplete: z.number(),
});

export const BadgeWithNext = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  threshold: z.number(),
  type: BadgeType,
  tier: z.number(),
  imageUrl: z.string(),
  pointsAwarded: z.number(),
  nextBadge: Badge,
});

export const DateProgress = z.object({
  progress: z.number(),
  daysCompleted: z.number(),
  daysRemaining: z.number(),
});

export const UserChallengesExtraDTO = z.object({
  id: z.number(),
  userChallengeId: z.number(),
  name: z.string(),
  description: z.string(),
  frequency: ChallengeFrequency,
  type: BadgeType,
  threshold: z.number(),
  duration: z.number(),
  challengeStartDate: z.date(),
  challengeEndDate: z.date(),
  pointsAwarded: z.number(),
  userChallengeStartDate: z.date(),
  userChallengeEndDate: z.date(),
  status: ActivityAction,
  dateProgress: DateProgress,
  additionalInfo: AdditionalChallengeInfo,
});

export const Status = z.object({
  statusCode: z.string(),
  statusDescription: z.string(),
  additionalStatuses: z.array(AdditionalStatus).nullable(),
  badgesEarned: z.array(BadgeWithNext).nullable(),
  challenges: z.array(UserChallengesExtraDTO).nullable(),
});

export const AddChallengeSchema = z.object({
  challengeId: z.number(),
  clerkId: z.string(),
});

export const SingleBookStatsSchema = z.string();

export const updateFriendRequestSchema = z.object({
  clerkId: z.string().nullable(),
  friendId: z.string(),
  status: z.enum(["CONFIRMED", "DECLINED", "BLOCKED", "PENDING"]),
});

export const AddFriendRequestSchema = z.object({
  requestingClerkId: z.string(),
  friendToAddClerkId: z.string(),
  successString: z.string(),
});
