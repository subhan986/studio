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

export type AgentName = 'scraper' | 'validator' | 'enhancer';

const initialAgentState: AgentResultData = {
  data: null,
  error: null,
  status: 'idle',
};

export function UrlProcessorPageClient() {
  const [results, setResults] = useState<Record<AgentName, AgentResultData>>({
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
          description: "One or more agents encountered an error.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Processing Complete",
          description: "URL has been processed successfully.",
        });
      }

    } catch (error) {
      console.error("Failed to process URL:", error);
      toast({
        title: "System Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setResults({ // Reset to error state if action itself fails
        scraper: { ...initialAgentState, status: 'error', error: 'System error' },
        validator: { ...initialAgentState, status: 'error', error: 'System error' },
        enhancer: { ...initialAgentState, status: 'error', error: 'System error' },
      });
    } finally {
      setIsProcessing(false);
    }
  }

  const showResults = results.scraper.status !== 'idle' || results.validator.status !== 'idle' || results.enhancer.status !== 'idle' || isProcessing;

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Process URL</CardTitle>
          <CardDescription>Enter a URL to extract, validate, and enhance information using AI agents.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/product-page" {...field} />
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
                  "Process URL"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Processing Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AgentResultCard agentName="Smart Scraper" icon="SearchCode" result={results.scraper} />
                <AgentResultCard agentName="AI Validator" icon="ShieldCheck" result={results.validator} />
                <AgentResultCard agentName="Gemini Enhancer" icon="Sparkles" result={results.enhancer} />
            </div>
        </div>
      )}
      {!showResults && !isProcessing && (
         <Card className="shadow-lg">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Enter a URL above and click "Process URL" to see the AI agents in action.</p>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
