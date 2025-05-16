"use server";

import { smartScraper, SmartScraperOutput } from '@/ai/flows/smart-scraper';
import { validateCompanyData, ValidateCompanyDataInput, ValidateCompanyDataOutput } from '@/ai/flows/ai-data-validator';
import { enhanceContent, EnhanceContentInput, EnhanceContentOutput } from '@/ai/flows/gemini-content-enhancer';

export interface ProcessUrlActionResponse {
  scraperData?: SmartScraperOutput;
  scraperError?: string;
  validatorData?: ValidateCompanyDataOutput;
  validatorError?: string;
  enhancerData?: EnhanceContentOutput;
  enhancerError?: string;
}

export async function processUrlAction(url: string): Promise<ProcessUrlActionResponse> {
  const response: ProcessUrlActionResponse = {};

  // Agent 1: Scraper
  let scraperOutput: SmartScraperOutput | undefined;
  try {
    scraperOutput = await smartScraper({ url });
    response.scraperData = scraperOutput;
  } catch (error: any) {
    console.error("Scraper Agent Error:", error);
    response.scraperError = error.message || "Failed to scrape content.";
    // Optionally, stop processing if scraper fails critically
    // return response; 
  }

  // Agent 2: Validator
  // Proceed even if scraper had issues, to show validator might report errors about missing input
  if (scraperOutput) { // Only run if scraper produced some output
    try {
      const validatorInput: ValidateCompanyDataInput = {
        companyName: scraperOutput.productName || "N/A",
        sourceText: scraperOutput.description || "No description scraped.",
        // newsArticleText, foundingDateOfficial, ceoOfficial are optional and not available from a generic URL input
      };
      const validatorOutput = await validateCompanyData(validatorInput);
      response.validatorData = validatorOutput;
    } catch (error: any) {
      console.error("Validator Agent Error:", error);
      response.validatorError = error.message || "Failed to validate content.";
    }
  } else {
     response.validatorError = "Skipped due to scraper failure or no data.";
  }


  // Agent 3: Enhancer
  // Proceed based on scraper output and validator results
  if (scraperOutput) { // Only run if scraper produced some output
    try {
      const facts: string[] = [];
      if (scraperOutput.keySpecs) facts.push(`Key Specifications: ${scraperOutput.keySpecs}`);
      
      if (response.validatorData) {
        if (response.validatorData.inconsistencies && response.validatorData.inconsistencies.length > 0) {
          facts.push(`Validation Inconsistencies: ${response.validatorData.inconsistencies.join('; ')}`);
        } else {
          facts.push("Validation: Data appears consistent based on available checks.");
        }
        if (response.validatorData.foundingDateConsistent === false) facts.push("Note: Founding date information might be inconsistent or unverified.");
        if (response.validatorData.ceoConsistent === false) facts.push("Note: CEO information might be inconsistent or unverified.");
      } else if (response.validatorError) {
        facts.push(`Validation Status: Error - ${response.validatorError}`);
      } else {
        facts.push("Validation: Status unknown or skipped.");
      }


      const enhancerInput: EnhanceContentInput = {
        validatedFacts: facts.length > 0 ? facts : ["No specific facts extracted or validated."],
        sourceText: scraperOutput.description || "No source description available for enhancement context.",
        organizeChronologically: false, // Default as per PRD for general cases
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
