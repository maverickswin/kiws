import * as kiws from '../src';

@kiws.Module({
})
class ServiceStatsHandlerModule {
}

kiws.bootstrap(ServiceStatsHandlerModule, { noStart: true });
