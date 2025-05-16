
'use server';

/**
 * @fileOverview This file defines an AI flow for assessing the apparent reliability and internal consistency of article content.
 *
 * - validateArticleData - Assesses article data based on provided text.
 * - ValidateArticleDataInput - The input type for the validateArticleData function.
 * - ValidateArticleDataOutput - The return type for the validateArticleData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateArticleDataInputSchema = z.object({
  articleTitle: z.string().describe('The title of the article.'),
  articleSummary: z.string().describe('The summary of the article content.'),
  keyTakeaways: z.array(z.string()).optional().describe('Key takeaways from the article.'),
  fullArticleText: z.string().optional().describe('The full text of the article for context.'),
});
export type ValidateArticleDataInput = z.infer<typeof ValidateArticleDataInputSchema>;

const ValidateArticleDataOutputSchema = z.object({
  overallAssessment: z.string().describe('An overall assessment of the information\'s apparent reliability based on the provided text (e.g., "Appears well-supported by details in text", "Contains claims needing external verification", "Lacks sufficient detail for assessment").'),
  potentialUnsupportedClaims: z.array(z.string()).describe('A list of specific claims or statements from the article that seem to lack clear support within the provided text or might warrant external verification.'),
  consistencyInternal: z.boolean().describe('Whether the information within the article appears internally consistent.')
});
export type ValidateArticleDataOutput = z.infer<typeof ValidateArticleDataOutputSchema>;

export async function validateArticleData(input: ValidateArticleDataInput): Promise<ValidateArticleDataOutput> {
  return validateArticleDataFlow(input);
}

const validateArticleDataPrompt = ai.definePrompt({
  name: 'validateArticleDataPrompt',
  input: {schema: ValidateArticleDataInputSchema},
  output: {schema: ValidateArticleDataOutputSchema},
  prompt: `You are an AI assistant that assesses the apparent reliability and internal consistency of information presented in an article summary and its key takeaways.
You are NOT performing external fact-checking. Your assessment is based SOLELY on the provided text. Your output for text fields should be in natural, clear English.

Article Title: {{{articleTitle}}}
Article Summary: {{{articleSummary}}}
{{#if keyTakeaways}}
Key Takeaways:
{{#each keyTakeaways}}
- {{{this}}}
{{/each}}
{{/if}}
{{#if fullArticleText}}
Full Article Text (for context, use sparingly if very long, focus on summary and takeaways):
{{{fullArticleText}}}
{{/if}}

Instructions:
1. Read the article summary and key takeaways (and full text if provided and relevant).
2. Assess if the main points seem internally consistent with each other and with the summary. Set 'consistencyInternal' (true/false).
3. Identify any specific statements or claims within the summary or takeaways that seem inadequately supported by the details presented in the provided text itself, or that might generally warrant external verification. List these under 'potentialUnsupportedClaims'. If none, provide an empty array. Ensure claims are phrased in natural English.
4. Provide an 'overallAssessment' of the information's apparent reliability based *only* on the provided text. Examples: "Appears well-supported by details in text", "Contains claims needing external verification", "Lacks sufficient detail for assessment", "Generally coherent and internally consistent". Ensure this assessment is in natural English.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const validateArticleDataFlow = ai.defineFlow(
  {
    name: 'validateArticleDataFlow',
    inputSchema: ValidateArticleDataInputSchema,
    outputSchema: ValidateArticleDataOutputSchema,
  },
  async input => {
    const {output} = await validateArticleDataPrompt(input);
    return output!;
  }
);

