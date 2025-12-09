"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocraticQuestionsProps {
  content: string;
  assumptions: string[];
  uncertainties: string[];
}

interface SocraticResponse {
  questions: string[];
  blindSpots?: string[];
}

export function SocraticQuestions({
  content,
  assumptions,
  uncertainties,
}: SocraticQuestionsProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SocraticResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (content.trim().length < 20) {
      setError("Write more content first (at least 20 characters)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/socratic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, assumptions, uncertainties }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate questions");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <SparklesIcon className="w-4 h-4" />
          Socratic Questioning
          <span className="text-xs font-normal text-muted-foreground ml-2">
            AI-assisted
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get thought-provoking questions to examine your thinking more deeply.
        </p>
      </CardHeader>
      <CardContent>
        {!response ? (
          <div className="space-y-3">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Thinking...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate Questions
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Uses Claude AI. Your content is sent to Anthropic&apos;s API.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Questions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Questions to Consider</h4>
              <ul className="space-y-2">
                {response.questions.map((question, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            {/* Blind Spots */}
            {response.blindSpots && response.blindSpots.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Potential Blind Spots</h4>
                <ul className="space-y-2">
                  {response.blindSpots.map((blindSpot, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground bg-amber-500/5 p-3 rounded-lg"
                    >
                      {blindSpot}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reset */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setResponse(null)}
              className="w-full"
            >
              Generate New Questions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
