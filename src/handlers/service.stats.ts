import { ServiceStats } from './service.stats.handler';

export class ServiceHealthStats implements ServiceStats {

  stats() {
    return {
      status: 'ok',
    };
  }
}
