import { Cache } from "./cache";
import Redis, { ChainableCommander } from "ioredis";

export class RedisAdapter implements Cache {
  private readonly redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

  private _client = new Redis(this.redisUrl);

  constructor() {}

  get client(): Redis {
    return this._client;
  }

  async get(key: string): Promise<string | null> {
    const data = await this.client.get(key);
    return data;
  }

  async set(
    key: string,
    value: number,
    ttl?: number | undefined
  ): Promise<void> {
    await this.client.set(key, value, "EX", ttl ?? 60);
  }

  async increment(key: string): Promise<void> {
    const pipeline = this.client.pipeline();
    pipeline.incr(key);
    await pipeline.exec();
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async watch(key: string): Promise<void> {
    await this.client.watch(key);
  }

  async multi(): Promise<ChainableCommander> {
    return this.client.multi();
  }
}
