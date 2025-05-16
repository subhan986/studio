
"use server";

import { articleScraper, ArticleScraperOutput, ArticleScraperInput } from '@/ai/flows/article-scraper';
import { validateArticleData, ValidateArticleDataInput, ValidateArticleDataOutput } from '@/ai/flows/article-data-validator';
import { enhanceContent, EnhanceContentInput, EnhanceContentOutput } from '@/ai/flows/gemini-content-enhancer';

export interface ProcessUrlActionResponse {
  scraperData?: ArticleScraperOutput;
  scraperError?: string;
  validatorData?: ValidateArticleDataOutput;
  validatorError?: string;
  enhancerData?: EnhanceContentOutput;
  enhancerError?: string;
}

export async function processUrlAction(url: string): Promise<ProcessUrlActionResponse> {
  const response: ProcessUrlActionResponse = {};

  // Agent 1: Article Scraper
  let scraperOutput: ArticleScraperOutput | undefined;
  try {
    const scraperInput: ArticleScraperInput = { url };
    scraperOutput = await articleScraper(scraperInput);
    response.scraperData = scraperOutput;
  } catch (error: any) {
    console.error("Scraper Agent Error:", error);
    response.scraperError = error.message || "Failed to scrape content from URL.";
  }

  // Agent 2: Article Validator
  if (scraperOutput) {
    try {
      const validatorInput: ValidateArticleDataInput = {
        articleTitle: scraperOutput.title,
        articleSummary: scraperOutput.summary,
        keyTakeaways: scraperOutput.keyTakeaways,
        fullArticleText: scraperOutput.fullText,
      };
      const validatorOutput = await validateArticleData(validatorInput);
      response.validatorData = validatorOutput;
    } catch (error: any) {
      console.error("Validator Agent Error:", error);
      response.validatorError = error.message || "Failed to validate article content.";
    }
  } else if (!response.scraperError) {
     response.validatorError = "Skipped: No data from scraper.";
  }


  // Agent 3: Content Enhancer
  if (scraperOutput) {
    try {
      const enhancerInput: EnhanceContentInput = {
        articleTitle: scraperOutput.title,
        articleSummary: scraperOutput.summary,
        articleKeyTakeaways: scraperOutput.keyTakeaways, // Pass along even if potentially empty
        fullArticleText: scraperOutput.fullText || scraperOutput.summary || "No source text available for enhancement context.",
      };
      const enhancerOutput = await enhanceContent(enhancerInput);
      response.enhancerData = enhancerOutput;
    } catch (error: any)
    {
      console.error("Enhancer Agent Error:", error);
      response.enhancerError = error.message || "Failed to enhance content.";
    }
  } else if (!response.scraperError) {
    response.enhancerError = "Skipped: No data from scraper.";
  }

  return response;
}

