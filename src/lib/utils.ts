import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMinutesSeconds(timestamp: number) {
  const minutes = new Date(timestamp ?? 0).getMinutes();
  const seconds = new Date(timestamp ?? 0).getSeconds();
  return `${minutes}:${seconds}`;
}
