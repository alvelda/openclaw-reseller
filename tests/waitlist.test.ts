import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isValidEmail } from '../src/lib/waitlist';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('window', { 
  localStorage: localStorageMock,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe('Waitlist', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('a@b.co')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail('no spaces@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('Waitlist Store', () => {
    it('should import waitlist functions', async () => {
      const waitlist = await import('../src/lib/waitlist');
      expect(typeof waitlist.getWaitlistStore).toBe('function');
      expect(typeof waitlist.addToWaitlist).toBe('function');
      expect(typeof waitlist.getWaitlistCount).toBe('function');
    });

    it('should initialize with seed count', async () => {
      const { getWaitlistStore } = await import('../src/lib/waitlist');
      const store = getWaitlistStore();
      expect(store.seedCount).toBeGreaterThan(0);
      expect(store.totalCount).toBe(store.seedCount);
      expect(store.entries).toHaveLength(0);
    });

    it('should add new entry and increment count', async () => {
      // Fresh import to reset module state
      vi.resetModules();
      const { addToWaitlist, getWaitlistCount, getWaitlistStore } = await import('../src/lib/waitlist');
      
      const initialCount = getWaitlistCount();
      const result = addToWaitlist('test@example.com', 'pro', 'hero');
      
      expect(result.success).toBe(true);
      expect(result.isNew).toBe(true);
      expect(result.totalCount).toBe(initialCount + 1);
      
      const store = getWaitlistStore();
      expect(store.entries).toHaveLength(1);
      expect(store.entries[0].email).toBe('test@example.com');
      expect(store.entries[0].tier).toBe('pro');
      expect(store.entries[0].source).toBe('hero');
    });

    it('should not duplicate existing emails', async () => {
      vi.resetModules();
      const { addToWaitlist, getWaitlistStore } = await import('../src/lib/waitlist');
      
      const first = addToWaitlist('duplicate@example.com', 'starter', 'hero');
      const second = addToWaitlist('duplicate@example.com', 'pro', 'tier');
      
      expect(first.isNew).toBe(true);
      expect(second.isNew).toBe(false);
      
      const store = getWaitlistStore();
      const duplicates = store.entries.filter(e => e.email === 'duplicate@example.com');
      expect(duplicates).toHaveLength(1);
    });

    it('should handle case-insensitive email matching', async () => {
      vi.resetModules();
      const { addToWaitlist, getWaitlistStore } = await import('../src/lib/waitlist');
      
      addToWaitlist('Test@Example.com', 'starter', 'hero');
      const result = addToWaitlist('test@example.com', 'pro', 'tier');
      
      expect(result.isNew).toBe(false);
      
      const store = getWaitlistStore();
      expect(store.entries).toHaveLength(1);
    });

    it('should update tier if not previously set', async () => {
      vi.resetModules();
      const { addToWaitlist, getWaitlistStore } = await import('../src/lib/waitlist');
      
      addToWaitlist('notier@example.com', null, 'hero');
      addToWaitlist('notier@example.com', 'max', 'tier');
      
      const store = getWaitlistStore();
      const entry = store.entries.find(e => e.email === 'notier@example.com');
      expect(entry?.tier).toBe('max');
    });

    it('should generate unique IDs for entries', async () => {
      vi.resetModules();
      const { addToWaitlist, getWaitlistStore } = await import('../src/lib/waitlist');
      
      addToWaitlist('user1@example.com', 'starter', 'hero');
      addToWaitlist('user2@example.com', 'pro', 'tier');
      addToWaitlist('user3@example.com', 'max', 'footer');
      
      const store = getWaitlistStore();
      const ids = store.entries.map(e => e.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(uniqueIds).toHaveLength(3);
      ids.forEach(id => {
        expect(id).toMatch(/^wl_\d+_[a-z0-9]+$/);
      });
    });

    it('should record timestamp for entries', async () => {
      vi.resetModules();
      const { addToWaitlist, getWaitlistStore } = await import('../src/lib/waitlist');
      
      const before = Date.now();
      addToWaitlist('timestamp@example.com', 'pro', 'hero');
      const after = Date.now();
      
      const store = getWaitlistStore();
      const entry = store.entries[0];
      
      expect(entry.timestamp).toBeGreaterThanOrEqual(before);
      expect(entry.timestamp).toBeLessThanOrEqual(after);
    });
  });
});
