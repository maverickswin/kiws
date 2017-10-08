import * as logger        from '@nodeswork/logger';

import { Module }         from '../module';
import {
  KoaService,
  ModuleService,
}                         from '../providers';
import {
  BodyParserMiddleware,
  ErrorHandleMiddleware,
  LogRequestMiddleware,
}                         from '../middlewares';
import {
  ServiceHandler,
  ServiceHealthStats,
  ServiceStatsHandler,
  SERVICE_STATS_PROVIDER,
}                         from '../handlers';
import {
  ContextInput,
  ContextInputProvider,
}                         from '../inputs';
import {
  constants
}                         from '../constants';

const LOG = logger.getLogger();

@Module({
  middlewares: [
    BodyParserMiddleware,
    ErrorHandleMiddleware,
    LogRequestMiddleware,
  ],
  handlers: [
    ServiceHandler,
    ServiceStatsHandler,
  ],
  inputs: [
    ContextInputProvider,
  ],
  providers: [
    ContextInput,
    ModuleService,
    KoaService,
    {
      provide:   SERVICE_STATS_PROVIDER,
      useClass:  ServiceHealthStats,
      multi:     true,
    },
  ],
})
export class CoreModule {

  constructor(
    private koa: KoaService,
  ) {
    const port = parseInt(process.env[constants.env.PORT] || '28900');
    if (!process.env[constants.env.NO_SERVER]) {
      this.koa.app.listen(port);
      LOG.info('server is start', { url: `http://localhost:${port}` });
    }
  }
}
