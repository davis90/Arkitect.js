/* eslint class-methods-use-this: 0 */

import { expect, assert } from 'chai';
import Interface from '@/interface/Interface';
import Implementation from '@/interface/Implementation';

describe('Implementation()', () => {
  const Interface1 = class extends Interface {
    func1() {}

    func2() {}
  };

  const Interface2 = class extends Interface1 {
    func3() {}
  };

  const Impl1 = class extends Implementation(Interface1) {
    func1(val) {
      return val + 5;
    }
  };

  const Impl2 = class extends Impl1 {
    func2() {
      return 1;
    }
  };

  const Impl3 = class extends Implementation(Interface1, Interface2) {
    func1(val) {
      return val + 10;
    }
  };

  const Impl4 = class extends Impl3 {
    func2() {
      return 4;
    }
  };

  const Impl5 = class extends Impl4 {
    func3(val) {
      return val - 5;
    }
  };

  it('Throws error if try to instantiate Implementation with no interface definition', () => {
    const Impl6 = class extends Implementation(null) {};
    const Impl7 = class extends Implementation() {};
    const Impl8 = class extends Implementation(undefined) {};
    expect(() => new Impl6()).to.throw();
    expect(() => new Impl7()).to.throw();
    expect(() => new Impl8()).to.throw();
  });

  it('Throws error if try to instantiate Implementation with unvalid interface definition', () => {
    const Impl6 = class extends Implementation({}) {};
    const Impl7 = class extends Implementation(() => {}) {};
    const Impl8 = class extends Implementation(3) {};
    const Impl9 = class extends Implementation('Interface') {};
    const Impl10 = class extends Implementation(true) {};
    expect(() => new Impl6()).to.throw();
    expect(() => new Impl7()).to.throw();
    expect(() => new Impl8()).to.throw();
    expect(() => new Impl9()).to.throw();
    expect(() => new Impl10()).to.throw();
  });

  it('Throws error if try to instantiate Implementation that doesn\'t implement his interface', () => {
    expect(() => new Impl1()).to.throw();
    expect(() => new Impl3()).to.throw();
    expect(() => new Impl4()).to.throw();
  });

  it('Doesn\'t Throw error if try to instantiate Implementation that implements his interface', () => {
    expect(() => new Impl2()).to.not.throw();
    expect(() => new Impl5()).to.not.throw();
  });

  it('Instantiate Implementation class', () => {
    assert.notEqual(new Impl2(), new Impl2());
    assert.notEqual(new Impl5(), new Impl5());
    let impl = new Impl2();
    assert.equal(impl.func1(3), 8);
    assert.equal(impl.func2(), 1);
    impl = new Impl5();
    assert.equal(impl.func1(3), 13);
    assert.equal(impl.func2(), 4);
    assert.equal(impl.func3(5), 0);
  });
});
