import { db } from './db/dexieDB';

export class StorageService {
  static async requestPersistence(): Promise<boolean> {
    if (navigator.storage && navigator.storage.persist) {
      return await navigator.storage.persist();
    }
    return false;
  }

  static async getStorageStats(): Promise<{ usage: number; quota: number; percent: number }> {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 1;
      return {
        usage,
        quota,
        percent: Math.round((usage / quota) * 100)
      };
    }
    return { usage: 0, quota: 1, percent: 0 };
  }
}
