
// src/ai/flows/gemini-content-enhancer.ts
'use server';
/**
 * @fileOverview An AI agent that refines and enhances article content into well-written prose.
 *
 * - enhanceContent - A function that handles the content enhancement process.
 * - EnhanceContentInput - The input type for the enhanceContent function.
 * - EnhanceContentOutput - The return type for the enhanceContent function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const EnhanceContentInputSchema = z.object({
  articleTitle: z.string().describe('The original title of the article.'),
  articleSummary: z.string().describe('The original summary of the article.'),
  articleKeyTakeaways: z.array(z.string()).optional().describe('A list of key takeaways from the original article.'),
  fullArticleText: z.string().optional().describe('The full text of the original article, to be used as a detailed reference for enhancement and to ensure accuracy.'),
});

export type EnhanceContentInput = z.infer<typeof EnhanceContentInputSchema>;

const EnhanceContentOutputSchema = z.object({
  enhancedProse: z.string().describe('A well-written, coherent, and enhanced version of the article\'s core information. This should be clean English prose, organized into paragraphs, and free of markdown, HTML, or other non-prose symbols/formatting. It should be based solely on the provided input text.'),
});

export type EnhanceContentOutput = z.infer<typeof EnhanceContentOutputSchema>;

export async function enhanceContent(input: EnhanceContentInput): Promise<EnhanceContentOutput> {
  return enhanceContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceContentPrompt',
  input: {schema: EnhanceContentInputSchema},
  output: {schema: EnhanceContentOutputSchema},
  prompt: `You are an expert content editor and rewriter.
Your task is to take an article's title, its original summary, key takeaways (if provided), and the full article text.
Based on these inputs, you will produce a single, high-quality, enhanced piece of prose that represents the core information of the article.

Your enhanced prose should:
1. Be written in clear, natural English.
2. Be more comprehensive and well-structured than the original summary. Use the 'Full Article Text' to draw additional details, provide better explanations, or add relevant context to the main points found in the original summary and key takeaways.
3. Synthesize the information into a coherent narrative, NOT just a list of elaborated points or an outline.
4. Be organized into well-formed paragraphs.
5. CRITICALLY: The output must be pure English prose. Do NOT use any markdown (like ###, *, -), HTML tags, or other non-prose symbols or formatting. Your response should be directly usable as plain text.
6. Ensure accuracy based on the provided 'Full Article Text'. Do not introduce external information not present in the inputs.
7. Handle any typical text formatting (like newlines for paragraph breaks) in the input 'Full Article Text' gracefully. These are normal for input but should not be literally part of your prose output unless it's for standard paragraph separation.

Article Title: {{{articleTitle}}}

Original Summary:
{{{articleSummary}}}

{{#if articleKeyTakeaways}}
Original Key Takeaways (for context):
{{#each articleKeyTakeaways}}
- {{{this}}}
{{/each}}
{{/if}}

{{#if fullArticleText}}
Full Article Text (use this for detailed reference and to ensure accuracy):
{{{fullArticleText}}}
{{else}}
(No full article text provided for detailed reference)
{{/if}}

Now, provide the Enhanced Prose:
`,
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
      throw new Error("AI failed to enhance content in the expected format. The model may not have returned valid structured data.");
    }
    return output;
  }
);

