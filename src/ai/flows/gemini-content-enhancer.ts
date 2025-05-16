// src/ai/flows/gemini-content-enhancer.ts
'use server';
/**
 * @fileOverview An AI agent that enhances validated content by summarizing context and organizing information.
 *
 * - enhanceContent - A function that handles the content enhancement process.
 * - EnhanceContentInput - The input type for the enhanceContent function.
 * - EnhanceContentOutput - The return type for the enhanceContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceContentInputSchema = z.object({
  validatedFacts: z
    .array(z.string())
    .describe('An array of validated facts to enhance.'),
  sourceText: z.string().describe('The original source text for context.'),
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
  prompt: `You are an expert content enhancer, specializing in creating detailed and accurate outlines for educational articles or videos.

You will receive a list of validated facts and the original source text.
Your goal is to:
1. Add context to each fact by summarizing relevant surrounding text from the original source.
2. Synthesize information from multiple facts into a coherent description.
3. Rephrase awkward or technically-worded text segments into clearer, more readable language.
4. Standardize formatting for dates, numbers, currency, and other data types.
5. Organize the information {{{#if organizeChronologically}}chronologically{{else}}thematically{{/if}}}.

Validated Facts:
{{#each validatedFacts}}- {{{this}}}
{{/each}}

Original Source Text:
{{{sourceText}}}

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
    return output!;
  }
);
