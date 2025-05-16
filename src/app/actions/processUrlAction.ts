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
    // Optionally, stop processing if scraper fails critically
    // return response; 
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
  } else {
     response.validatorError = "Skipped due to scraper failure or no data.";
  }


  // Agent 3: Content Enhancer
  if (scraperOutput) {
    try {
      const pointsToElaborate: string[] = [];
      if (scraperOutput.keyTakeaways && scraperOutput.keyTakeaways.length > 0) {
        pointsToElaborate.push(...scraperOutput.keyTakeaways.map(kt => `Key takeaway: ${kt}`));
      } else if (scraperOutput.summary) {
         pointsToElaborate.push(`Article Summary: ${scraperOutput.summary}`);
      }

      if (response.validatorData) {
        pointsToElaborate.push(`Validator Assessment: ${response.validatorData.overallAssessment}`);
        if (response.validatorData.potentialUnsupportedClaims && response.validatorData.potentialUnsupportedClaims.length > 0) {
          pointsToElaborate.push(`Potential Unsupported Claims from Article: ${response.validatorData.potentialUnsupportedClaims.join('; ')}`);
        }
        pointsToElaborate.push(`Internal Consistency of Article: ${response.validatorData.consistencyInternal ? 'Appears consistent' : 'May have inconsistencies'}`);
      } else if (response.validatorError) {
        pointsToElaborate.push(`Article Validation Status: Error - ${response.validatorError}`);
      }


      const enhancerInput: EnhanceContentInput = {
        pointsToElaborate: pointsToElaborate.length > 0 ? pointsToElaborate : ["No specific points identified from article for elaboration."],
        contextualText: scraperOutput.fullText || scraperOutput.summary || "No source text available for enhancement context.",
        organizeChronologically: false, 
      };
      const enhancerOutput = await enhanceContent(enhancerInput);
      response.enhancerData = enhancerOutput;
    } catch (error: any) {
      console.error("Enhancer Agent Error:", error);
      response.enhancerError = error.message || "Failed to enhance content.";
    }
  } else {
    response.enhancerError = "Skipped due to scraper failure or no data.";
  }

  return response;
}
