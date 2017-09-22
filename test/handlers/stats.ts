import * as kiws from '../../src';

describe('ServiceStatsHandler', () => {

  it('should load', async () => {
    const handler: kiws.ServiceStatsHandler =
      await kiws.beanProvider.getBean('ServiceStatsHandler') as any;

    handler.should.be.ok();

    const stats = await handler.stats();
    stats.should.be.deepEqual({
      status: 'ok',
    });
  });
});
