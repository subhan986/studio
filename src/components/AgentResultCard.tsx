"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle, SearchCode, ShieldCheck, Sparkles, Icon as LucideIcon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export interface AgentResultData {
  data: any | null;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

interface AgentResultCardProps {
  agentName: string;
  icon: 'SearchCode' | 'ShieldCheck' | 'Sparkles';
  result: AgentResultData;
}

const iconMap: Record<AgentResultCardProps['icon'], LucideIcon> = {
  SearchCode,
  ShieldCheck,
  Sparkles,
};

export function AgentResultCard({ agentName, icon, result }: AgentResultCardProps) {
  const AgentIcon = iconMap[icon];

  const renderContent = () => {
    if (result.status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Processing...</p>
        </div>
      );
    }
    if (result.status === 'error' && result.error) {
      return (
        <Alert variant="destructive" className="mt-4">
          <XCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{result.error}</AlertDescription>
        </Alert>
      );
    }
    if (result.status === 'success' && result.data) {
      return (
        <>
        <Alert variant="default" className="mt-4 bg-primary/10 border-primary/30">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary">Success</AlertTitle>
          <AlertDescription className="text-primary/80">Data processed successfully.</AlertDescription>
        </Alert>
        <ScrollArea className="mt-4 h-64 w-full rounded-md border p-4 bg-muted/30">
          <pre className="text-sm whitespace-pre-wrap break-all">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </ScrollArea>
        </>
      );
    }
    if (result.status === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center h-40">
                <AgentIcon className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Waiting for process to start...</p>
            </div>
        );
    }
    return <p className="mt-4 text-muted-foreground">No data or error information available.</p>;
  };

  return (
    <Card className="shadow-md flex flex-col">
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
