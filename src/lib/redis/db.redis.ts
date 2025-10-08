import Redis from 'ioredis';
import { env } from '../../env';
import { Logger } from '../../lib/logger';

const log = new Logger(__filename);
// Connect to Redis
class RedisCache {
  client: Redis | null;
  isEnabled: boolean;

  constructor() {
    this.isEnabled = env.redis.enabled;

    if (this.isEnabled) {
      this.client = new Redis({
        host: env.redis.host,
        port: env.redis.port,
        password: env.redis.password,
        keyPrefix: env.redis.keyPrefix,
        db: env.redis.db,
      });

      this.client.on('error', err => console.error('Redis error:', err));
    } else {
      this.client = null;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isEnabled || !this.client) {
      return null;
    }
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttl = 60): Promise<void> {
    if (!this.isEnabled || !this.client) {
      return;
    }
    await this.client.setex(key, ttl, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    if (!this.isEnabled || !this.client) {
      return;
    }

    await this.client.del(key);
  }

  async getDataElseUpdate<T>(key: string, fetchFunction: () => Promise<T>): Promise<T | null> {
    if (!this.isEnabled || !this.client) {
      const response = await fetchFunction();
      return response;
    }

    const cachedData = await this.get<T>(key);
    log.info(`Data from RedisCache: ${key}`);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetchFunction();
    await this.set(key, response, 60);

    return response;
  }
}

export default new RedisCache();
