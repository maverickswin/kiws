import * as _           from 'underscore';

import { Module }       from './module';
import { beanProvider } from './injection';
import { CoreModule }   from './modules';
import { constants }    from './constants';

/**
 * Bootstrap series modules.
 */
export function bootstrap(modules: any | any[], options: {
  noStart?: boolean;
} = {}) {
  if (options.noStart) {
    process.env[constants.env.NO_SERVER] = 'true';
  }

  modules = _.filter(_.flatten([modules]), _.identity);
  modules.push(CoreModule);

  for (const m of modules as Module[]) {
    m.$register();
  }

  for (const m of modules as Module[]) {
    beanProvider.getSingletonBean(m.name);
  }
}
