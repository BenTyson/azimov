/**
 * Local storage utilities for the thinking journal
 *
 * Philosophy: Your thoughts stay on your device by default.
 * No server, no sync, no tracking. Just you and your thinking.
 */

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  assumptions: string[];
  uncertainties: string[];
  keyQuestion?: string;
  relatedTopicId?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface JournalHistory {
  entryId: string;
  version: number;
  content: string;
  assumptions: string[];
  uncertainties: string[];
  savedAt: string;
}

const JOURNAL_KEY = 'clarify_journal_entries';
const HISTORY_KEY = 'clarify_journal_history';

/**
 * Generate a unique ID for journal entries
 */
function generateId(): string {
  return `entry_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get all journal entries from localStorage
 */
export function getJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load journal entries:', error);
    return [];
  }
}

/**
 * Get a single journal entry by ID
 */
export function getJournalEntry(id: string): JournalEntry | null {
  const entries = getJournalEntries();
  return entries.find(entry => entry.id === id) || null;
}

/**
 * Save a new journal entry
 */
export function createJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt' | 'version'>): JournalEntry {
  const entries = getJournalEntries();
  const now = new Date().toISOString();

  const newEntry: JournalEntry = {
    ...entry,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    version: 1,
  };

  entries.unshift(newEntry);
  saveEntries(entries);

  return newEntry;
}

/**
 * Update an existing journal entry
 * Automatically saves previous version to history
 */
export function updateJournalEntry(id: string, updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>): JournalEntry | null {
  const entries = getJournalEntries();
  const index = entries.findIndex(entry => entry.id === id);

  if (index === -1) return null;

  const currentEntry = entries[index];

  // Save current version to history before updating
  saveToHistory(currentEntry);

  const updatedEntry: JournalEntry = {
    ...currentEntry,
    ...updates,
    updatedAt: new Date().toISOString(),
    version: currentEntry.version + 1,
  };

  entries[index] = updatedEntry;
  saveEntries(entries);

  return updatedEntry;
}

/**
 * Delete a journal entry
 */
export function deleteJournalEntry(id: string): boolean {
  const entries = getJournalEntries();
  const filtered = entries.filter(entry => entry.id !== id);

  if (filtered.length === entries.length) return false;

  saveEntries(filtered);
  return true;
}

/**
 * Get the version history for an entry
 */
export function getEntryHistory(entryId: string): JournalHistory[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    const allHistory: JournalHistory[] = JSON.parse(data);
    return allHistory.filter(h => h.entryId === entryId).sort((a, b) => b.version - a.version);
  } catch (error) {
    console.error('Failed to load entry history:', error);
    return [];
  }
}

/**
 * Export all journal data (for backup)
 */
export function exportJournalData(): string {
  const entries = getJournalEntries();
  const history = getAllHistory();

  return JSON.stringify({
    exportedAt: new Date().toISOString(),
    entries,
    history,
  }, null, 2);
}

/**
 * Import journal data (from backup)
 */
export function importJournalData(jsonData: string): { success: boolean; entriesImported: number } {
  try {
    const data = JSON.parse(jsonData);

    if (!data.entries || !Array.isArray(data.entries)) {
      return { success: false, entriesImported: 0 };
    }

    saveEntries(data.entries);

    if (data.history && Array.isArray(data.history)) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(data.history));
    }

    return { success: true, entriesImported: data.entries.length };
  } catch (error) {
    console.error('Failed to import journal data:', error);
    return { success: false, entriesImported: 0 };
  }
}

// Private helper functions

function saveEntries(entries: JournalEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

function saveToHistory(entry: JournalEntry): void {
  if (typeof window === 'undefined') return;

  const historyItem: JournalHistory = {
    entryId: entry.id,
    version: entry.version,
    content: entry.content,
    assumptions: entry.assumptions,
    uncertainties: entry.uncertainties,
    savedAt: new Date().toISOString(),
  };

  const history = getAllHistory();
  history.push(historyItem);

  // Keep only last 50 history items per entry
  const grouped = new Map<string, JournalHistory[]>();
  for (const h of history) {
    const existing = grouped.get(h.entryId) || [];
    existing.push(h);
    grouped.set(h.entryId, existing);
  }

  const trimmed: JournalHistory[] = [];
  for (const [, items] of grouped) {
    const sorted = items.sort((a, b) => b.version - a.version);
    trimmed.push(...sorted.slice(0, 50));
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

function getAllHistory(): JournalHistory[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}
