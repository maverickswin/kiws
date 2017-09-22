import * as Router from 'koa-router';
import * as uuid   from 'uuid/v1';

import { InputProvider, InputGenerator, RawInput } from '../input';

@InputProvider({})
export class ContextInputProvider {

  @InputGenerator({})
  generateContextInput(ctx: Router.IRouterContext): RawInput {
    return {
      type: 'ContextInput',
      data: { ctx },
    };
  }
}

export class ContextInput {
  public ctx:        Router.IRouterContext;
  public requsetId:  string = uuid();
}
