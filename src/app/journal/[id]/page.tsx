"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJournalEntry } from "@/hooks/useJournal";

export default function EditJournalEntry() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { entry, history, loading, update, remove } = useJournalEntry(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyQuestion, setKeyQuestion] = useState("");
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [newAssumption, setNewAssumption] = useState("");
  const [uncertainties, setUncertainties] = useState<string[]>([]);
  const [newUncertainty, setNewUncertainty] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load entry data
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setKeyQuestion(entry.keyQuestion || "");
      setAssumptions(entry.assumptions);
      setUncertainties(entry.uncertainties);
    }
  }, [entry]);

  // Track changes
  useEffect(() => {
    if (!entry) return;

    const changed =
      title !== entry.title ||
      content !== entry.content ||
      keyQuestion !== (entry.keyQuestion || "") ||
      JSON.stringify(assumptions) !== JSON.stringify(entry.assumptions) ||
      JSON.stringify(uncertainties) !== JSON.stringify(entry.uncertainties);

    setHasChanges(changed);
  }, [title, content, keyQuestion, assumptions, uncertainties, entry]);

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
    if (!content.trim() || !hasChanges) return;

    setSaving(true);
    try {
      update({
        title: title.trim() || "Untitled Entry",
        content: content.trim(),
        keyQuestion: keyQuestion.trim() || undefined,
        assumptions,
        uncertainties,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this entry? This cannot be undone.")) {
      remove();
      router.push("/journal");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Entry not found</p>
        <Link href="/journal">
          <Button>Back to Journal</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Clarify
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/journal">
              <Button variant="ghost" size="sm">
                Back
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || saving}
            >
              {saving ? "Saving..." : hasChanges ? "Save Changes" : "Saved"}
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="history">
                History ({history.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              {/* Metadata */}
              <div className="text-sm text-muted-foreground flex items-center gap-4">
                <span>Version {entry.version}</span>
                <span>Last updated {formatDate(entry.updatedAt)}</span>
              </div>

              {/* Title */}
              <Input
                placeholder="What are you thinking about?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-semibold border-0 px-0 focus-visible:ring-0 bg-transparent"
              />

              {/* Key Question */}
              <Input
                placeholder="Key question you're exploring (optional)"
                value={keyQuestion}
                onChange={(e) => setKeyQuestion(e.target.value)}
                className="text-sm text-muted-foreground border-0 px-0 focus-visible:ring-0 bg-transparent"
              />

              {/* Main Content */}
              <Textarea
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] text-base leading-relaxed resize-none border-0 px-0 focus-visible:ring-0 bg-transparent"
              />

              {/* Structured Reflection */}
              <div className="space-y-6">
                {/* Assumptions */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Assumptions
                    </CardTitle>
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
              </div>

              {/* Delete */}
              <div className="pt-8 border-t border-border/50">
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={handleDelete}
                >
                  Delete Entry
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-6">
                  See how your thinking has evolved. Each time you save changes, the previous version is preserved.
                </p>

                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No previous versions yet. Make edits and save to build history.
                  </p>
                ) : (
                  history.map((h) => (
                    <Card key={`${h.entryId}-${h.version}`} className="border-border/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">
                            Version {h.version}
                          </CardTitle>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(h.savedAt)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {h.content.length > 300
                            ? h.content.substring(0, 300) + "..."
                            : h.content}
                        </p>
                        {(h.assumptions.length > 0 || h.uncertainties.length > 0) && (
                          <div className="mt-3 flex gap-2">
                            {h.assumptions.length > 0 && (
                              <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded">
                                {h.assumptions.length} assumptions
                              </span>
                            )}
                            {h.uncertainties.length > 0 && (
                              <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded">
                                {h.uncertainties.length} uncertainties
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
