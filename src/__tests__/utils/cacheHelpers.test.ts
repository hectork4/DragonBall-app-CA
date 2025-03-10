import { loadFromCache, saveToCache } from '../../utils/cacheHelpers';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('cacheHelpers', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers().setSystemTime(new Date('2023-01-01').getTime());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('saveToCache', () => {
    it('should save data to localStorage with a timestamp', () => {
      const key = 'testKey';
      const data = { name: 'Goku' };

      saveToCache(key, data);

      const cachedData = JSON.parse(localStorage.getItem(key) || '{}');
      expect(cachedData.data).toEqual(data);
      expect(cachedData.timestamp).toBeDefined();
    });
  });

  describe('loadFromCache', () => {
    it('should return data if it is not expired', () => {
      const key = 'testKey';
      const data = { name: 'Goku' };
      const timestamp = Date.now();

      localStorage.setItem(key, JSON.stringify({ data, timestamp }));

      const result = loadFromCache<typeof data>(key);
      expect(result).toEqual(data);
    });

    it('should return null if data is expired', () => {
      const key = 'testKey';
      const data = { name: 'Goku' };
      const timestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago

      localStorage.setItem(key, JSON.stringify({ data, timestamp }));

      const result = loadFromCache<typeof data>(key);
      expect(result).toBeNull();
    });

    it('should return null if no data is found', () => {
      const key = 'nonExistentKey';

      const result = loadFromCache(key);
      expect(result).toBeNull();
    });
  });
});
