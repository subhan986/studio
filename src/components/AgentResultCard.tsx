
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle, SearchCode, ShieldCheck, Sparkles, Icon as LucideIcon, Check, FileText, ListChecks, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import type { ArticleScraperOutput } from '@/ai/flows/article-scraper';
import type { ValidateArticleDataOutput } from '@/ai/flows/article-data-validator';
import type { EnhanceContentOutput } from '@/ai/flows/gemini-content-enhancer';

export interface AgentResultData {
  data: any | null;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export type AgentName = 'Article Scraper' | 'Article Validator' | 'Content Enhancer';

interface AgentResultCardProps {
  agentName: AgentName;
  icon: 'SearchCode' | 'ShieldCheck' | 'Sparkles';
  result: AgentResultData;
}

const iconMap: Record<AgentResultCardProps['icon'], LucideIcon> = {
  SearchCode,
  ShieldCheck,
  Sparkles,
};

const renderScraperData = (data: ArticleScraperOutput) => (
  <div className="space-y-3 text-sm">
    <div>
      <h4 className="font-semibold text-primary mb-1 flex items-center">
        <FileText className="mr-2 h-4 w-4" /> Title
      </h4>
      <p className="text-foreground/90">{data.title || "Not found"}</p>
    </div>
    <div>
      <h4 className="font-semibold text-primary mb-1 flex items-center">
        <MessageSquare className="mr-2 h-4 w-4" /> Summary
      </h4>
      <ScrollArea className="h-28 rounded-md border bg-secondary p-2">
        <p className="text-foreground/90 whitespace-pre-wrap break-words">{data.summary || "Not found"}</p>
      </ScrollArea>
    </div>
    {data.keyTakeaways && data.keyTakeaways.length > 0 && (
      <div>
        <h4 className="font-semibold text-primary mb-1 flex items-center">
          <ListChecks className="mr-2 h-4 w-4" /> Key Takeaways
        </h4>
        <ScrollArea className="h-28 rounded-md border bg-secondary p-2">
        <ul className="list-disc list-inside pl-2 space-y-1 text-foreground/90">
          {data.keyTakeaways.map((takeaway, index) => (
            <li key={index}>{takeaway}</li>
          ))}
        </ul>
        </ScrollArea>
      </div>
    )}
  </div>
);

const renderValidatorData = (data: ValidateArticleDataOutput) => (
  <div className="space-y-3 text-sm">
    <div>
      <h4 className="font-semibold text-primary mb-1 flex items-center">
        <ShieldCheck className="mr-2 h-4 w-4" /> Overall Assessment
      </h4>
      <p className="text-foreground/90">{data.overallAssessment}</p>
    </div>
    <div>
      <h4 className="font-semibold text-primary mb-1 flex items-center">
        <Check className="mr-2 h-4 w-4" /> Internal Consistency
      </h4>
      <p className="text-foreground/90 flex items-center">
        {data.consistencyInternal ? <ThumbsUp className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" /> : <ThumbsDown className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />}
        {data.consistencyInternal ? "Appears internally consistent" : "Potential internal inconsistencies found"}
      </p>
    </div>
    {data.potentialUnsupportedClaims && data.potentialUnsupportedClaims.length > 0 && (
      <div>
        <h4 className="font-semibold text-primary mb-1 flex items-center">
          <ListChecks className="mr-2 h-4 w-4" /> Potential Unsupported Claims
        </h4>
        <ScrollArea className="h-32 rounded-md border bg-secondary p-2">
          <ul className="list-disc list-inside pl-2 space-y-1 text-foreground/90">
            {data.potentialUnsupportedClaims.map((claim, index) => (
              <li key={index}>{claim}</li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    )}
     {data.potentialUnsupportedClaims && data.potentialUnsupportedClaims.length === 0 && (
        <p className="text-foreground/80 italic">No specific unsupported claims identified based on the provided text.</p>
     )}
  </div>
);

const renderEnhancerData = (data: EnhanceContentOutput) => (
  <div className="space-y-3 text-sm">
    <div>
      <h4 className="font-semibold text-primary mb-1 flex items-center">
        <Sparkles className="mr-2 h-4 w-4" /> Enhanced Prose
      </h4>
      <ScrollArea className="h-60 rounded-md border bg-secondary p-2">
        <p className="text-foreground/90 whitespace-pre-wrap break-words">{data.enhancedProse}</p>
      </ScrollArea>
    </div>
  </div>
);


export function AgentResultCard({ agentName, icon, result }: AgentResultCardProps) {
  const AgentIcon = iconMap[icon];

  const renderFormattedData = () => {
    if (!result.data) return <p className="mt-4 text-muted-foreground">No data to display.</p>;

    switch (agentName) {
      case 'Article Scraper':
        return renderScraperData(result.data as ArticleScraperOutput);
      case 'Article Validator':
        return renderValidatorData(result.data as ValidateArticleDataOutput);
      case 'Content Enhancer':
        return renderEnhancerData(result.data as EnhanceContentOutput);
      default:
        return <pre className="text-sm whitespace-pre-wrap break-all">{JSON.stringify(result.data, null, 2)}</pre>;
    }
  };

  const renderContent = () => {
    if (result.status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Processing...</p>
        </div>
      );
    }
    if (result.status === 'error' && result.error) {
      return (
        <Alert variant="destructive" className="mt-4">
          <XCircle className="h-5 w-5 animate-shake-gentle" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{result.error}</AlertDescription>
        </Alert>
      );
    }
    if (result.status === 'success' && result.data) {
      return (
        <>
          <Alert variant="default" className="mt-4 bg-primary/10 border-primary/30">
            <CheckCircle2 className="h-5 w-5 text-primary animate-pulse-soft" />
            <AlertTitle className="text-primary">Success</AlertTitle>
            <AlertDescription className="text-primary/80">Data processed successfully.</AlertDescription>
          </Alert>
          <ScrollArea className="mt-4 flex-grow w-full rounded-md border p-4 bg-muted/30 min-h-[200px]">
            {renderFormattedData()}
          </ScrollArea>
        </>
      );
    }
    if (result.status === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
                <AgentIcon className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Waiting for process to start...</p>
            </div>
        );
    }
    return <p className="mt-4 text-muted-foreground">No data or error information available.</p>;
  };

  return (
    <Card className="shadow-md flex flex-col h-full card-hover">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <AgentIcon className="h-7 w-7 text-primary" />
          <CardTitle className="text-lg">{agentName}</CardTitle>
        </div>
        <CardDescription>Output from the {agentName.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
