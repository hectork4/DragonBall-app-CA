export const loadFromCache = <T>(key: string): T | null => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
    if (!isExpired) {
      return data as T;
    }
  }
  return null;
};

export const saveToCache = <T>(key: string, data: T): void => {
  const cacheEntry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};
