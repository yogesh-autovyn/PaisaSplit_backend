import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

export const homeLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const expressApp = settings.getData('express_app');
    expressApp.get(env.app.routePrefix, (req: express.Request, res: express.Response) =>
      res.json({
        message: 'App is working',
      }),
    );
  }
};
