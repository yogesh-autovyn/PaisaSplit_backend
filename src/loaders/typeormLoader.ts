import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { dataSource } from '../database/config/ormconfig.default';

export const typeormLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined,
) => {
  try {
    const connection = await dataSource.initialize();

    if (settings) {
      settings.setData('connection', connection);
      settings.onShutdown(() => connection.destroy());
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Re-throw to track in logs
  }
};
