import * as Koa                              from 'koa';

import * as logger                           from '@nodeswork/logger';

import { AppMiddleware, MiddlewareProvider } from '../middleware';

const LOG = logger.getLogger();

@MiddlewareProvider()
export class LogRequestMiddleware {

  @AppMiddleware()
  async logRequest(ctx: Koa.Context, next: () => void) {
    LOG.info('Request', {
      path:    ctx.request.path,
      method:  ctx.request.method,
      header:  ctx.request.header,
    });
    await next();
  }
}
