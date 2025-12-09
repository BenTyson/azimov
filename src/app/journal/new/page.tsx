"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJournal } from "@/hooks/useJournal";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocraticQuestions } from "@/components/features/journal/socratic-questions";

// Structured prompts to help surface deeper thinking
const THINKING_PROMPTS = [
  "What key question are you trying to answer?",
  "What would change your mind about this?",
  "What are you most uncertain about?",
  "Whose perspective might you be missing?",
  "What assumptions are you making?",
];

export default function NewJournalEntry() {
  const router = useRouter();
  const { create } = useJournal();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyQuestion, setKeyQuestion] = useState("");
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [newAssumption, setNewAssumption] = useState("");
  const [uncertainties, setUncertainties] = useState<string[]>([]);
  const [newUncertainty, setNewUncertainty] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentPrompt] = useState(() =>
    THINKING_PROMPTS[Math.floor(Math.random() * THINKING_PROMPTS.length)]
  );

  const handleAddAssumption = () => {
    if (newAssumption.trim()) {
      setAssumptions([...assumptions, newAssumption.trim()]);
      setNewAssumption("");
    }
  };

  const handleRemoveAssumption = (index: number) => {
    setAssumptions(assumptions.filter((_, i) => i !== index));
  };

  const handleAddUncertainty = () => {
    if (newUncertainty.trim()) {
      setUncertainties([...uncertainties, newUncertainty.trim()]);
      setNewUncertainty("");
    }
  };

  const handleRemoveUncertainty = (index: number) => {
    setUncertainties(uncertainties.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    try {
      const entry = create({
        title: title.trim() || "Untitled Entry",
        content: content.trim(),
        keyQuestion: keyQuestion.trim() || undefined,
        assumptions,
        uncertainties,
      });

      router.push(`/journal/${entry.id}`);
    } catch (error) {
      console.error("Failed to save entry:", error);
      setSaving(false);
    }
  };

  const canSave = content.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Clarify
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/journal">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </Link>
            <Button size="sm" onClick={handleSave} disabled={!canSave || saving}>
              {saving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Prompt */}
          <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground italic">
              Prompt: {currentPrompt}
            </p>
          </div>

          {/* Title */}
          <Input
            placeholder="What are you thinking about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold border-0 px-0 mb-2 focus-visible:ring-0 bg-transparent"
          />

          {/* Key Question */}
          <Input
            placeholder="Key question you're exploring (optional)"
            value={keyQuestion}
            onChange={(e) => setKeyQuestion(e.target.value)}
            className="text-sm text-muted-foreground border-0 px-0 mb-6 focus-visible:ring-0 bg-transparent"
          />

          {/* Main Content */}
          <Textarea
            placeholder="Write your thoughts here. Don't worry about being polished—this is a space for thinking out loud..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] text-base leading-relaxed resize-none border-0 px-0 focus-visible:ring-0 bg-transparent"
          />

          {/* Structured Reflection */}
          <div className="mt-8 space-y-6">
            {/* Assumptions */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Assumptions
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  What are you taking for granted? What beliefs underpin your thinking?
                </p>
              </CardHeader>
              <CardContent>
                {assumptions.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {assumptions.map((assumption, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm bg-blue-500/5 p-2 rounded"
                      >
                        <span className="flex-1">{assumption}</span>
                        <button
                          onClick={() => handleRemoveAssumption(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an assumption..."
                    value={newAssumption}
                    onChange={(e) => setNewAssumption(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddAssumption()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddAssumption}
                    disabled={!newAssumption.trim()}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Uncertainties */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Uncertainties
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  What don&apos;t you know? Where is your confidence low?
                </p>
              </CardHeader>
              <CardContent>
                {uncertainties.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {uncertainties.map((uncertainty, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm bg-amber-500/5 p-2 rounded"
                      >
                        <span className="flex-1">{uncertainty}</span>
                        <button
                          onClick={() => handleRemoveUncertainty(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an uncertainty..."
                    value={newUncertainty}
                    onChange={(e) => setNewUncertainty(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddUncertainty()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddUncertainty}
                    disabled={!newUncertainty.trim()}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Socratic Questioning */}
            <SocraticQuestions
              content={content}
              assumptions={assumptions}
              uncertainties={uncertainties}
            />
          </div>

          {/* Save Button (mobile) */}
          <div className="mt-8 sm:hidden">
            <Button className="w-full" onClick={handleSave} disabled={!canSave || saving}>
              {saving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
