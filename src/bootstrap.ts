import * as _           from 'underscore';

import { Module }       from './module';
import { beanProvider } from './injection';
import { CoreModule }   from './modules';
import { constants }    from './constants';

/**
 * Bootstrap series modules.
 */
export function bootstrap(nwModel?: any, options: {
  noStart?: boolean;
} = {}) {

  if (options.noStart) {
    process.env[constants.env.NO_SERVER] = 'true';
  }

  const modules = _.filter([ nwModel, CoreModule ], (x) => x);

  for (const m of modules as Module[]) {
    m.$register();
  }

  for (const m of modules as Module[]) {
    beanProvider.getSingletonBean(m.name);
  }
}
