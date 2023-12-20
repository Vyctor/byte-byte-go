import { ChainableCommander } from "ioredis";

export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: number, ttl?: number): Promise<void>;
  increment(key: string): Promise<void>;
  del(key: string): Promise<void>;
  watch(key: string): Promise<void>;
  multi(): Promise<ChainableCommander>;
}
