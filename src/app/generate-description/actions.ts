"use server";

import { generateProjectDescription, type GenerateProjectDescriptionInput } from "@/ai/flows/generate-project-description";
import { z } from "zod";

const GenerateProjectDescriptionInputSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  keywords: z.string().min(3, "Keywords must be at least 3 characters long."),
});

export interface FormState {
  message: string;
  description?: string;
  fields?: Record<string, string>;
  issues?: string[];
}

export async function generateDescriptionAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = GenerateProjectDescriptionInputSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data.",
      issues,
      fields: formData as Record<string, string>,
    };
  }

  try {
    const aiInput: GenerateProjectDescriptionInput = {
      title: parsed.data.title,
      keywords: parsed.data.keywords,
    };
    const result = await generateProjectDescription(aiInput);
    return {
      message: "Description generated successfully!",
      description: result.description,
    };
  } catch (error) {
    console.error("Error generating project description:", error);
    return {
      message: "Failed to generate description. Please try again.",
      fields: parsed.data,
      issues: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}
