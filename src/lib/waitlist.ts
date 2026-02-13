// Waitlist management for pre-orders
export interface WaitlistEntry {
  id: string;
  email: string;
  tier: 'starter' | 'pro' | 'max' | null;
  timestamp: number;
  source: 'hero' | 'tier' | 'footer';
}

export interface WaitlistStore {
  entries: WaitlistEntry[];
  totalCount: number;
  seedCount: number; // Base count to show (social proof)
}

const STORAGE_KEY = 'openclaw-waitlist';
const SEED_COUNT = 127; // Start with some social proof

export function getWaitlistStore(): WaitlistStore {
  if (typeof window === 'undefined') {
    return { entries: [], totalCount: SEED_COUNT, seedCount: SEED_COUNT };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to read waitlist:', e);
  }
  
  return { entries: [], totalCount: SEED_COUNT, seedCount: SEED_COUNT };
}

export function saveWaitlistStore(store: WaitlistStore): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save waitlist:', e);
  }
}

export function addToWaitlist(
  email: string, 
  tier: 'starter' | 'pro' | 'max' | null,
  source: 'hero' | 'tier' | 'footer'
): { success: boolean; isNew: boolean; totalCount: number } {
  const store = getWaitlistStore();
  
  // Check if email already exists
  const existing = store.entries.find(e => e.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    // Update tier preference if provided
    if (tier && !existing.tier) {
      existing.tier = tier;
      saveWaitlistStore(store);
    }
    return { success: true, isNew: false, totalCount: store.totalCount };
  }
  
  // Add new entry
  const entry: WaitlistEntry = {
    id: generateId(),
    email,
    tier,
    timestamp: Date.now(),
    source,
  };
  
  store.entries.push(entry);
  store.totalCount = store.seedCount + store.entries.length;
  saveWaitlistStore(store);
  
  // Dispatch event for UI updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('waitlist-updated'));
  }
  
  return { success: true, isNew: true, totalCount: store.totalCount };
}

export function getWaitlistCount(): number {
  const store = getWaitlistStore();
  return store.totalCount;
}

export function getWaitlistEntries(): WaitlistEntry[] {
  const store = getWaitlistStore();
  return store.entries;
}

function generateId(): string {
  return `wl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
