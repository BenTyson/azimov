"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  JournalEntry,
  getJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getEntryHistory,
  JournalHistory,
} from '@/lib/storage/journal';

/**
 * Hook for managing journal entries
 */
export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load entries on mount
  useEffect(() => {
    setEntries(getJournalEntries());
    setLoading(false);
  }, []);

  const refresh = useCallback(() => {
    setEntries(getJournalEntries());
  }, []);

  const create = useCallback((entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => {
    const newEntry = createJournalEntry(entry);
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const update = useCallback((id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => {
    const updated = updateJournalEntry(id, updates);
    if (updated) {
      setEntries(prev => prev.map(e => e.id === id ? updated : e));
    }
    return updated;
  }, []);

  const remove = useCallback((id: string) => {
    const success = deleteJournalEntry(id);
    if (success) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
    return success;
  }, []);

  return {
    entries,
    loading,
    refresh,
    create,
    update,
    remove,
  };
}

/**
 * Hook for managing a single journal entry
 */
export function useJournalEntry(id: string | null) {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [history, setHistory] = useState<JournalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setEntry(null);
      setHistory([]);
      setLoading(false);
      return;
    }

    const loadedEntry = getJournalEntry(id);
    setEntry(loadedEntry);

    if (loadedEntry) {
      setHistory(getEntryHistory(id));
    }

    setLoading(false);
  }, [id]);

  const update = useCallback((updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>) => {
    if (!id) return null;

    const updated = updateJournalEntry(id, updates);
    if (updated) {
      setEntry(updated);
      setHistory(getEntryHistory(id));
    }
    return updated;
  }, [id]);

  const remove = useCallback(() => {
    if (!id) return false;
    return deleteJournalEntry(id);
  }, [id]);

  return {
    entry,
    history,
    loading,
    update,
    remove,
  };
}
