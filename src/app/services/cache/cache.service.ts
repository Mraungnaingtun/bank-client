// cache.service.ts
import { Injectable } from '@angular/core';

interface CacheItem {
  value: any;
  expiry: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheItem>();

  set(key: string, value: any, options?: { ttl?: number }): void {
    const ttl = options?.ttl ?? 60; // Default TTL of 60 seconds
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiry });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key); // Remove expired item
      return null;
    }
    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}
