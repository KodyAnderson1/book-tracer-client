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
  isbn_10: string | null;
  isbn_13: string | null;
  page_count: number | null;
  print_type: string | null;
  categories: string[];
  average_rating: number | null;
  ratings_count: number | null;
  maturity_rating: string | null;
  small_thumbnail: string | null;
  thumbnail: string | null;
  reading_status: string;
  last_page_read: number | null;
  last_reading_update: string | null;
  inLibrary: boolean;
}

/**********************************************/

export interface CustomUser {
  clerkId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

export interface SaveBookResponse {
  id: string;
}

export interface UpdateProgress {
  clerkId: string;
  bookId: string;
  currentPage: number;
  pagesRead: number;
  action: "STARTED_BOOK" | "READ_PAGES" | "COMPLETED_BOOK";
}

/*********************************************** */

export interface DateProgress {
  progress: number;
  daysCompleted: number;
  daysRemaining: number;
}

export interface AdditionalInfo {
  done: number;
  toGo: number;
  percentComplete: number;
}

export interface Challenge {
  id: number;
  userChallengeId: number;
  name: string;
  description: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  type: "STREAK" | "PAGES" | "BOOKS";
  threshold: number;
  duration: number;
  challengeStartDate: string | null;
  challengeEndDate: string | null;
  pointsAwarded: number;
  userChallengeStartDate: string | null;
  userChallengeEndDate: string | null;
  status: "STARTED_CHALLENGE" | null;
  dateProgress: DateProgress | null;
  additionalInfo: AdditionalInfo | null;
}

export type Challenges = Challenge[];

export interface Badge {
  id: number;
  name: string;
  description: string;
  threshold: number;
  type:
    | "PAGES"
    | "ENGAGEMENT"
    | "COMPLETION"
    | "STREAK"
    | "FRIENDS"
    | "CHALLENGES"
    | "COLLECTOR"
    | "BOOKS";
  tier: number;
  imageUrl: string;
  pointsAwarded: number;
  dateEarned: string | null;
  additionalBadgeInfo: AdditionalInfo | null;
}

export interface BadgeResponse {
  Pages: Badge[];
  Engagement: Badge[];
  Completion: Badge[];
  Streak: Badge[];
  Friends: Badge[];
  Challenges: Badge[];
  Collector: Badge[];
  Books: Badge[];
}
