import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from '../../env';

const config: DataSourceOptions = {
  type: 'mongodb',
  url: env.db.url,
  synchronize: env.db.synchronize,
  logging: env.db.logging === 'true',
  entities: env.app.dirs.entities,
};

export const dataSource = new DataSource(config);
