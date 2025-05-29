"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateDescriptionAction, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Description
        </>
      )}
    </Button>
  );
}

export default function GenerateDescriptionPage() {
  const initialState: FormState = { message: "", fields: {}, issues: [] };
  const [state, formAction] = useFormState(generateDescriptionAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== "Invalid form data.") {
      toast({
        title: state.message.includes("success") ? "Success!" : "Error",
        description: state.message,
        variant: state.message.includes("success") ? "default" : "destructive",
      });
    }
    if (state.message.includes("success") && formRef.current) {
       // Optionally clear form on success, or keep fields
       // formRef.current.reset(); 
    }
  }, [state, toast]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary flex items-center justify-center">
            <Sparkles className="mr-2 h-7 w-7" /> AI Project Description Generator
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground pt-2">
            Craft compelling narratives for your projects. Enter a title and some keywords, and let AI assist you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-md font-medium">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., My Awesome Portfolio Website"
                defaultValue={state.fields?.title}
                className="mt-1"
                aria-describedby="title-error"
              />
              {state.issues?.find(issue => issue.toLowerCase().includes('title')) && (
                 <p id="title-error" className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('title'))}</p>
              )}
            </div>
            <div>
              <Label htmlFor="keywords" className="text-md font-medium">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="e.g., Next.js, TypeScript, Tailwind CSS, AI"
                defaultValue={state.fields?.keywords}
                className="mt-1"
                aria-describedby="keywords-error"
              />
              {state.issues?.find(issue => issue.toLowerCase().includes('keywords')) && (
                 <p id="keywords-error" className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('keywords'))}</p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        {state.description && (
          <CardFooter className="flex-col items-start gap-y-2 pt-6 border-t">
             <h3 className="text-xl font-semibold text-primary">Generated Description:</h3>
             <Textarea
                value={state.description}
                readOnly
                rows={8}
                className="bg-muted/50 border-muted-foreground/30 focus:ring-accent"
              />
               <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(state.description || '')} className="mt-2 self-end">
                Copy to Clipboard
              </Button>
          </CardFooter>
        )}
        {state.message && state.message !== "Invalid form data." && !state.message.includes("success") && (
           <CardFooter className="pt-4">
            <p className={`text-sm ${state.message.includes("success") ? "text-green-600" : "text-destructive"}`}>
              {state.message}
              {state.issues && state.issues.length > 0 && (
                <ul className="list-disc list-inside">
                  {state.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              )}
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
