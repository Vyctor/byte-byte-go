import { Cache } from "../../infra/cache/cache";

interface SimpleValidateAPICallUsecaseInput {
  ipAddress: string;
}

export class SimpleValidateApiCallUsecase {
  constructor(private readonly cache: Cache) {}

  async execute(input: SimpleValidateAPICallUsecaseInput): Promise<boolean> {
    const limit = 1000;
    const key = input.ipAddress;

    await this.cache.watch(key);
    const multi = await this.cache.multi();

    try {
      const redisData = await this.cache.get(key);
      if (!redisData) {
        multi.set(key, 1, "EX", 10);
        await multi.exec();
        return true;
      }
      const numberOfRequests = JSON.parse(redisData);
      if (numberOfRequests >= limit) {
        await multi.exec();
        return false;
      }
      multi.incr(key);
      await multi.exec();
      return true;
    } catch (error) {
      console.error("Error in transaction:", error);
      return false;
    }
  }
}
