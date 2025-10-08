import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// Load environment variables from `.env` file
import { env } from '../../env';
dotenv.config();

const config: DataSourceOptions = {
  type: env.db.type as unknown as 'mongodb',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  logging: env.db.logging === 'true',
  entities: env.app.dirs.entities,
  migrations: env.app.dirs.migrations,
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(config);
