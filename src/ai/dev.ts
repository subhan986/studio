import { config } from 'dotenv';
config();

import '@/ai/flows/gemini-content-enhancer.ts';
import '@/ai/flows/article-scraper.ts'; // Updated from smart-scraper.ts
import '@/ai/flows/article-data-validator.ts'; // Updated from ai-data-validator.ts
