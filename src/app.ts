import 'reflect-metadata';

import { bootstrapMicroframework } from 'microframework-w3tec';

import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { homeLoader } from './loaders/homeLoader';
import { iocLoader } from './loaders/iocLoader';
import { monitorLoader } from './loaders/monitorLoader';
// import { socketLoader } from './loaders/socketLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
/**
 * EXPRESS TYPESCRIPT APP
 * ----------------------------------------
 *
 * This is a app for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new Logger(__filename);
bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    winstonLoader,
    iocLoader,
    eventDispatchLoader,
    typeormLoader,
    expressLoader,
    swaggerLoader,
    monitorLoader,
    homeLoader,
    // socketLoader,
  ],
})
  .then(() => banner(log))
  // eslint-disable-next-line no-console
  .catch(error => console.trace(`Application is crashed: ${error}`));
