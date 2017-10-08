import * as injection from '../src/injection';


describe('injection', () => {

  @injection.Injectable({
    meta: { k: 'imA' },
  })
  class A {
    constructor() {}
  }

  @injection.Injectable({
    meta: { k: 'imB' },
  })
  class B extends A {
    constructor() {
      super();
    }
  }

  @injection.Injectable({
    meta: { k: 'imC' },
  })
  class C extends A {
    constructor() {
      super();
    }
  }

  it('should work for class inheritance', () => {
    injection.beanProvider.register(A);
    injection.beanProvider.register(B);
    injection.beanProvider.register(C);

    injection.getInjectionMetadata(A).name.should.be.equal('A');
    injection.getInjectionMetadata(B).name.should.be.equal('B');
    injection.getInjectionMetadata(C).name.should.be.equal('C');
  });
});
