import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJsonFromAnalysis(analysis: string) {
  const jsonPart = analysis.split("```json\n")[1].split("```")[0];
  return JSON.parse(jsonPart);
}
