
"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { processUrlAction, ProcessUrlActionResponse } from '@/app/actions/processUrlAction';
import { useToast } from "@/hooks/use-toast";
import { AgentResultCard, AgentResultData } from '@/components/AgentResultCard'; 
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }).min(1, { message: "URL cannot be empty." }),
});

export type LocalAgentName = 'scraper' | 'validator' | 'enhancer';

const initialAgentState: AgentResultData = {
  data: null,
  error: null,
  status: 'idle',
};

export function UrlProcessorPageClient() {
  const [results, setResults] = useState<Record<LocalAgentName, AgentResultData>>({
    scraper: { ...initialAgentState },
    validator: { ...initialAgentState },
    enhancer: { ...initialAgentState },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    setResults({
      scraper: { ...initialAgentState, status: 'loading' },
      validator: { ...initialAgentState, status: 'loading' },
      enhancer: { ...initialAgentState, status: 'loading' },
    });

    try {
      const response = await processUrlAction(values.url);
      
      setResults({
        scraper: {
          data: response.scraperData || null,
          error: response.scraperError || null,
          status: response.scraperError ? 'error' : (response.scraperData ? 'success' : 'idle'),
        },
        validator: {
          data: response.validatorData || null,
          error: response.validatorError || null,
          status: response.validatorError ? 'error' : (response.validatorData ? 'success' : 'idle'),
        },
        enhancer: {
          data: response.enhancerData || null,
          error: response.enhancerError || null,
          status: response.enhancerError ? 'error' : (response.enhancerData ? 'success' : 'idle'),
        },
      });

      if (response.scraperError || response.validatorError || response.enhancerError) {
        toast({
          title: "Processing Error",
          description: "One or more agents encountered an error. Check results for details.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Processing Complete",
          description: "URL has been processed successfully.",
        });
      }

    } catch (error: any) {
      console.error("Failed to process URL:", error);
      const errorMessage = error.message || "An unexpected error occurred. Please try again.";
      toast({
        title: "System Error",
        description: errorMessage,
        variant: "destructive",
      });
      setResults({ 
        scraper: { ...initialAgentState, status: 'error', error: `System error: ${errorMessage}` },
        validator: { ...initialAgentState, status: 'error', error: `System error: ${errorMessage}` },
        enhancer: { ...initialAgentState, status: 'error', error: `System error: ${errorMessage}` },
      });
    } finally {
      setIsProcessing(false);
    }
  }

  const showResults = results.scraper.status !== 'idle' || results.validator.status !== 'idle' || results.enhancer.status !== 'idle' || isProcessing;

  return (
    <div className="space-y-8 sm:space-y-10">
      <Card className="shadow-lg border-border/70 card-hover">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Process Article URL</CardTitle>
          <CardDescription className="text-sm sm:text-base">Enter an article URL to extract, validate its content, and enhance information using AI agents.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/article-page" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isProcessing} className="w-full sm:w-auto">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Article URL"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground/90 mb-2">Processing Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AgentResultCard agentName="Article Scraper" icon="SearchCode" result={results.scraper} />
                <AgentResultCard agentName="Article Validator" icon="ShieldCheck" result={results.validator} />
                <AgentResultCard agentName="Content Enhancer" icon="Sparkles" result={results.enhancer} />
            </div>
        </div>
      )}
      {!showResults && !isProcessing && (
         <Card className="shadow-lg card-hover">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Enter an article URL above and click "Process Article URL" to see the AI agents in action.</p>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
