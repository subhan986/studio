'use server';

/**
 * @fileOverview This file defines the AI data validator flow for cross-referencing factual information about companies.
 *
 * - validateCompanyData - Validates company data by cross-referencing information from different sources.
 * - ValidateCompanyDataInput - The input type for the validateCompanyData function.
 * - ValidateCompanyDataOutput - The return type for the validateCompanyData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateCompanyDataInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  sourceText: z.string().describe('The text extracted from the primary source (e.g., company website).'),
  newsArticleText: z.string().optional().describe('The text extracted from a news article about the company.'),
  foundingDateOfficial: z.string().optional().describe('The official founding date of the company (YYYY-MM-DD).'),
  ceoOfficial: z.string().optional().describe('The official CEO of the company.'),
});
export type ValidateCompanyDataInput = z.infer<typeof ValidateCompanyDataInputSchema>;

const ValidateCompanyDataOutputSchema = z.object({
  foundingDateConsistent: z.boolean().describe('Whether the founding date is consistent across sources.'),
  ceoConsistent: z.boolean().describe('Whether the CEO is consistent across sources.'),
  inconsistencies: z.array(z.string()).describe('A list of any inconsistencies found between the sources.'),
});
export type ValidateCompanyDataOutput = z.infer<typeof ValidateCompanyDataOutputSchema>;

export async function validateCompanyData(input: ValidateCompanyDataInput): Promise<ValidateCompanyDataOutput> {
  return validateCompanyDataFlow(input);
}

const validateCompanyDataPrompt = ai.definePrompt({
  name: 'validateCompanyDataPrompt',
  input: {schema: ValidateCompanyDataInputSchema},
  output: {schema: ValidateCompanyDataOutputSchema},
  prompt: `You are an expert business data validator. Your task is to cross-reference information about a company from different sources and identify any inconsistencies.

  Company Name: {{{companyName}}}

  Primary Source Text: {{{sourceText}}}

  News Article Text (if available): {{#if newsArticleText}}{{{newsArticleText}}}{{else}}Not available{{/if}}

  Official Founding Date: {{#if foundingDateOfficial}}{{{foundingDateOfficial}}}{{else}}Not available{{/if}}

  Official CEO: {{#if ceoOfficial}}{{{ceoOfficial}}}{{else}}Not available{{/if}}

  Instructions:

  1.  Compare the founding date and CEO mentioned in the news article (if available) with the official information (if available) and the primary source text.
  2.  Identify any inconsistencies between the sources.
  3.  Output a boolean value for foundingDateConsistent and ceoConsistent indicating whether the information is consistent across sources.
  4.  If inconsistencies are found, add a brief description of each inconsistency to the inconsistencies array.

  Output format: JSON
  `,config: {
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

const validateCompanyDataFlow = ai.defineFlow(
  {
    name: 'validateCompanyDataFlow',
    inputSchema: ValidateCompanyDataInputSchema,
    outputSchema: ValidateCompanyDataOutputSchema,
  },
  async input => {
    const {output} = await validateCompanyDataPrompt(input);
    return output!;
  }
);
