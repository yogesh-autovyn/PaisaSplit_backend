import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createExpressServer } from 'routing-controllers';
import { env } from '../env';

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
) => {
  try {
    if (settings) {
      const expressApp: Application = createExpressServer({
        cors: true,
        classTransformer: true,
        validation: true,
        routePrefix: env.app.routePrefix,
        defaultErrorHandler: false,
        controllers: env.app.dirs.controllers,
        middlewares: env.app.dirs.middlewares,
        interceptors: env.app.dirs.interceptors,
      });

      if (!env.isTest) {
        const server = expressApp.listen(env.app.port);
        settings.setData('express_server', server);
      }

      settings.setData('express_app', expressApp);
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Re-throw to track in logs
  }
};
