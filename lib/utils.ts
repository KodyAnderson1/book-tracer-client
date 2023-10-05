import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const TOKEN = process.env.TEMP_JWT || "";
const CLERK_DEV_TOKEN = process.env.CLERK_DEV_JWT || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function getJWTToken(realToken: string): string {
  return process.env.VERCEL_URL ? realToken : CLERK_DEV_TOKEN;
}
