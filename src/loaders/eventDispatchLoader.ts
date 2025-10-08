import { glob } from 'glob';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */
export const eventDispatchLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
) => {
  if (settings) {
    const patterns = env.app.dirs.subscribers;
    patterns.forEach(pattern => {
      glob(pattern)
        .then(files => {
          for (const file of files) {
            require(file);
          }
        })
        .catch(err => {
          console.error(`Error loading files for pattern ${pattern}:`, err);
        });
    });
  }
};
