import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { format, formatDistance, fromUnixTime } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number) {
  return format(fromUnixTime(timestamp), "yyyy-MM-dd HH:mm:ss");
}

export function getImageUrl(fileName: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${fileName}`;
}

export function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}