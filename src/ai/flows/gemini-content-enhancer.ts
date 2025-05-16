
// src/ai/flows/gemini-content-enhancer.ts
'use server';
/**
 * @fileOverview An AI agent that enhances content by elaborating on points and organizing information.
 *
 * - enhanceContent - A function that handles the content enhancement process.
 * - EnhanceContentInput - The input type for the enhanceContent function.
 * - EnhanceContentOutput - The return type for the enhanceContent function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const EnhanceContentInputSchema = z.object({
  pointsToElaborate: z
    .array(z.string())
    .describe('An array of key points, facts, or statements to enhance and elaborate upon.'),
  contextualText: z.string().describe('The original text (e.g., article summary or body) providing context.'),
  organizeChronologically: z
    .boolean()
    .optional()
    .default(false) // defaults to thematic if not specified
    .describe(
      'Whether to organize the enhanced content chronologically. Defaults to false (thematic organization) if not provided.'
    ),
});

export type EnhanceContentInput = z.infer<typeof EnhanceContentInputSchema>;

const EnhanceContentOutputSchema = z.object({
  enhancedContent: z.string().describe('The enhanced and organized content.'),
});

export type EnhanceContentOutput = z.infer<typeof EnhanceContentOutputSchema>;

export async function enhanceContent(input: EnhanceContentInput): Promise<EnhanceContentOutput> {
  return enhanceContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceContentPrompt',
  input: {schema: EnhanceContentInputSchema},
  output: {schema: EnhanceContentOutputSchema},
  prompt: `You are an expert content enhancer, specializing in creating detailed and accurate outlines or expanded content.

You will receive a list of points to elaborate upon and contextual text.
Your goal is to:
1. Add context to each point by drawing from the contextual text.
2. Synthesize information related to these points into a coherent narrative or explanation.
3. Rephrase any awkward or technically-worded segments into clearer, more readable language.
4. Standardize formatting for dates, numbers, currency, and other data types if applicable.
5. Organize the information {{{#if organizeChronologically}}chronologically{{else}}thematically{{/if}}}.

Points to Elaborate:
{{#each pointsToElaborate}}- {{{this}}}
{{/each}}

Contextual Text:
{{{contextualText}}}

Enhanced Content:
`, // the AI will generate enhanced content here
});

const enhanceContentFlow = ai.defineFlow(
  {
    name: 'enhanceContentFlow',
    inputSchema: EnhanceContentInputSchema,
    outputSchema: EnhanceContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to enhance content in the expected format.");
    }
    return output;
  }
);

