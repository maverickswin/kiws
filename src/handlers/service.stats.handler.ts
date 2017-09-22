import * as _                       from 'underscore';

import { Endpoint, Handler }        from '../handler';
import { ModuleService }            from '../providers';
import { InjectionMetadata, Token } from '../injection';

export const SERVICE_STATS_PROVIDER = 'SERVICE_STATS_PROVIDER';

export interface ServiceStats {
  stats(): any;
}

@Handler({})
export class ServiceStatsHandler {

  constructor(
    @Token(SERVICE_STATS_PROVIDER) private serviceStatsProviders: ServiceStats[],
  ) { }

  @Endpoint({ path: '/sstats' })
  async stats() {
    const result = {};

    for (const provider of this.serviceStatsProviders) {
      _.extend(result, await provider.stats());
    }
    return result;
  }
}
