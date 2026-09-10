import { z } from "zod";

export const PROJECT_TYPES = [
  { value: "quoting", label: "Field quoting / estimating tool" },
  { value: "internal-tools", label: "Internal tool or dashboard" },
  { value: "portal", label: "Customer portal" },
  { value: "invoicing", label: "Invoicing, payments or documents" },
  { value: "automation", label: "Automation / integration" },
  { value: "website", label: "Website" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const BUDGETS = [
  { value: "under-2500", label: "Under $2,500" },
  { value: "2500-7500", label: "$2,500 – $7,500" },
  { value: "7500-20000", label: "$7,500 – $20,000" },
  { value: "20000-plus", label: "$20,000+" },
  { value: "unknown", label: "I'd like your advice" },
] as const;

const enumFrom = <T extends readonly { value: string }[]>(list: T) =>
  z.enum(
    list.map((x) => x.value) as [T[number]["value"], ...T[number]["value"][]],
  );

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "That email address is too long."),
  company: z.string().trim().max(120, "That name is too long.").optional(),
  projectType: enumFrom(PROJECT_TYPES),
  budget: enumFrom(BUDGETS),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two, please — at least 20 characters.")
    .max(3000, "Please keep it under 3000 characters."),
  turnstileToken: z.string().min(1, "Please complete the spam check."),
});

export type ContactInput = z.infer<typeof contactSchema>;
