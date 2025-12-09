"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJournal } from "@/hooks/useJournal";
import { JournalEntry } from "@/lib/storage/journal";

export default function JournalPage() {
  const { entries, loading, remove } = useJournal();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Clarify
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/explore"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <Link href="/journal/new">
              <Button size="sm">New Entry</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Your Thinking Journal</h1>
            <p className="text-muted-foreground">
              A private space to articulate your thoughts, surface assumptions, and track how your thinking evolves.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search your entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Entries List */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading your entries...
            </div>
          ) : filteredEntries.length === 0 ? (
            <EmptyState hasEntries={entries.length > 0} />
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onDelete={() => remove(entry.id)} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function EntryCard({ entry, onDelete }: { entry: JournalEntry; onDelete: () => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPreview = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Link href={`/journal/${entry.id}`} className="flex-1">
            <CardTitle className="text-lg hover:text-primary transition-colors">
              {entry.title || 'Untitled Entry'}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>v{entry.version}</span>
            <span>{formatDate(entry.updatedAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/journal/${entry.id}`}>
          <p className="text-sm text-muted-foreground mb-3">
            {getPreview(entry.content)}
          </p>
        </Link>

        {/* Tags for assumptions and uncertainties */}
        <div className="flex flex-wrap gap-2 mb-3">
          {entry.assumptions.length > 0 && (
            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded">
              {entry.assumptions.length} assumption{entry.assumptions.length !== 1 ? 's' : ''}
            </span>
          )}
          {entry.uncertainties.length > 0 && (
            <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded">
              {entry.uncertainties.length} uncertaint{entry.uncertainties.length !== 1 ? 'ies' : 'y'}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/journal/${entry.id}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
          {!showDeleteConfirm ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Delete?</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={onDelete}
              >
                Yes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                No
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ hasEntries }: { hasEntries: boolean }) {
  if (hasEntries) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No entries match your search.</p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <svg className="w-16 h-16 mx-auto text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">Start your thinking journal</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Write about what you&apos;re thinking. Surface your assumptions.
        Note your uncertainties. Watch how your understanding evolves.
      </p>
      <Link href="/journal/new">
        <Button>Create Your First Entry</Button>
      </Link>
    </div>
  );
}
