
'use server';

/**
 * @fileOverview An AI agent for scraping article details from web pages.
 *
 * - articleScraper - A function that handles the article data extraction process.
 * - ArticleScraperInput - The input type for the articleScraper function.
 * - ArticleScraperOutput - The return type for the articleScraper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input for the exported function (what the user provides)
const ArticleScraperInputSchema = z.object({
  url: z.string().url().describe('The URL of the article to scrape.'),
});
export type ArticleScraperInput = z.infer<typeof ArticleScraperInputSchema>;

// Output schema for the scraper
const ArticleScraperOutputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  summary: z.string().describe('A concise summary of the article.'),
  keyTakeaways: z.array(z.string()).describe('A list of key takeaways or main points from the article.'),
  fullText: z.string().optional().describe('The full text content of the article, if feasible to extract.'),
});
export type ArticleScraperOutput = z.infer<typeof ArticleScraperOutputSchema>;

// Internal input schema for the Genkit flow (includes HTML content)
const ArticleScraperFlowInputSchema = z.object({
  url: z.string().url().describe('The URL of the article.'),
  htmlContent: z.string().describe('The HTML content of the article page.'),
});
type ArticleScraperFlowInput = z.infer<typeof ArticleScraperFlowInputSchema>;

export async function articleScraper(input: ArticleScraperInput): Promise<ArticleScraperOutput> {
  let htmlContent = '';
  try {
    const response = await fetch(input.url);
    if (!response.ok) {
      console.error(`Failed to fetch URL ${input.url}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }
    htmlContent = await response.text();
  } catch (error: any) {
    console.error(`Error fetching or reading content from URL ${input.url}:`, error);
    // Rethrow or return a structured error; for now, rethrowing.
    // This will be caught by the calling action.
    throw new Error(`Could not retrieve content from URL: ${error.message}`);
  }

  if (!htmlContent) {
    throw new Error('No content fetched from URL.');
  }
  
  return articleScraperFlow({ url: input.url, htmlContent });
}

const articleScraperPrompt = ai.definePrompt({
  name: 'articleScraperPrompt',
  input: {schema: ArticleScraperFlowInputSchema},
  output: {schema: ArticleScraperOutputSchema},
  prompt: `You are an expert article data extraction system.
You will be provided the HTML content of an article page and its URL.
Your task is to extract the article's title, a concise summary, key takeaways (as a list of strings), and if feasible, the full text of the article.
Focus on the main textual content and avoid sidebars, ads, and navigation menus. Try to extract the core article.

URL: {{{url}}}

HTML Content:
{{{htmlContent}}}
`,
});

const articleScraperFlow = ai.defineFlow(
  {
    name: 'articleScraperFlow',
    inputSchema: ArticleScraperFlowInputSchema,
    outputSchema: ArticleScraperOutputSchema,
  },
  async (flowInput: ArticleScraperFlowInput) => {
    const {output} = await articleScraperPrompt(flowInput);
    if (!output) {
      throw new Error("AI failed to extract article data in the expected format from the HTML content.");
    }
    return output; 
  }
);

