import { nanoid } from "nanoid";

export function generateSlug(patientName: string): string {
  const cleaned = patientName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 30);

  const randomId = nanoid(6);
  return `${cleaned}-${randomId}`;
}
