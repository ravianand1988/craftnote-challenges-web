import { set } from 'lodash-es';
import { ReplaySubject } from 'rxjs';

import { Deferred } from './deferred';


interface AnyObj {
  [key: string]: any;
}

type AnyObjGetter = (context: any) => AnyObj;

interface MockOpts {
  base?: AnyObj;
  methods?: string[];
  promises?: string[];
  observables?: string[];
  propertyObservables?: string[];
}

type ProviderConstructor<T> = new (...args: any[]) => T;

interface MockFactoryOpts extends MockOpts {
  base?: AnyObj | AnyObjGetter;
}

interface MockProvider<T> {
  context: any;
  provide: ProviderConstructor<T>;
  useFactory: () => Mock;
}

interface AsyncMockObj {
  [key: string]: any;
  _deferreds: { [key: string]: Deferred<any> };
  _subjects: { [key: string]: ReplaySubject<any> };

  getDeferred: (key: string) => Deferred<any>;
  getSubject: (key: string) => ReplaySubject<any>;
}

/**
 * Base container from which mocks are generated.
 */
class Mock implements AsyncMockObj {
  [key: string]: any;

  _deferreds = {};
  _subjects = {};

  public getDeferred(key): Deferred<any> {
    return this._deferreds[key];
  }

  public getSubject(key): ReplaySubject<any> {
    return this._subjects[key];
  }
}

/**
 * Return an object to be used to mock providers within tests.
 *
 * Unlike a simply jasmine.createSpyObj() mock, this implementation allows you
 * to easily create mocks for promises and/or observables (creating Deferreds
 * and Subjects respectively) to allow you to test asynchronous flows.
 *
 * Each of the methods/promises/observables are mocked using jasmine Spies.
 * You can use getDeferred()/getSubject() methods to push updates to your
 * asynchronous subscriptions are necessary.
 *
 * name - The name of the Provider being mocked
 * [opts.base] -Any object from which to base the mock object.
 * [opts.promises] - Provider methods to mock using Deferreds
 * [opts.observables] -Provider *methods* to mock using Subjects
 * [opts.propertyObservables] Provider *properties* to mock using Subjects
 * [opts.methods] - Provider methods to simply mock
 */
function createMock(name: string, opts: MockOpts): Mock {
  const {
    base = {},
    methods = [],
    promises = [],
    observables = [],
    propertyObservables = [],
  } = opts;

  const mock = Object.assign(new Mock(), base);
  methods.forEach(key => set(mock, key, jasmine.createSpy(`${name}.${key}`)));

  promises.forEach((key) => {
    const deferred = new Deferred();
    const spy = jasmine.createSpy(`${name}.${key}`);
    mock._deferreds[key] = deferred;
    set(mock, key, spy);
    spy.and.returnValue(deferred.promise);
  });

  observables.forEach((key) => {
    const subject = new ReplaySubject();
    const spy = jasmine.createSpy(`${name}.${key}`);
    mock._subjects[key] = subject;
    set(mock, key, spy);
    spy.and.returnValue(subject);
  });

  propertyObservables.forEach((key) => {
    const subject = new ReplaySubject();
    mock._subjects[key] = subject;
    set(mock, key, subject);
  });

  return mock;
}

/**
 * Return an Angular provider which uses a factory to create the mock.
 *
 * The factory uses the createMock() method above to mock the provider.
 *
 * This process is created to fit the Spectator variant of unit tests, which
 * uses a factory, and so doesn't require a beforeEach() call.
 *
 * A consequence of using a factory  however, is that the provider cannot be
 * changed *between* tests. This is solved by allowing the `base` option to
 * be a method, which takes a `context` and can be set before each test by
 * setting the `context` attribute on the mock provider (see example below).
 *
 * @example A test with a dynamic mock
 * const provider = createMockProvider(MyProvider, {
 *   base: context => {
 *     return { myBase: context.dynamicValue };
 *   },
 *   methods: ['foo.bar'],
 *   promises: ['zulu'],
 *   observables: ['baz'],
 *   propertyObservables: ['alpha'],
 * });
 *
 * const factory = createTestComponentFactory({
 *   componentProviders: [provider],
 *   ...
 * })
 *
 * it('does something', () => {
 *   provider.context = { dynamicValue: 'some-value' };
 *   const spectator = factory();
 * });
 */
function createMockProvider<T extends any>(
  provide: ProviderConstructor<T>,
  opts: MockFactoryOpts,
): MockProvider<T> {
  const { base } = opts;

  let _context;

  if (typeof base === 'function') {
    beforeEach(() => {
      _context = {};
    });
  }

  return {
    provide,
    useFactory: () => {
      const instanceOpts = Object.assign({}, opts);

      if (typeof base === 'function') {
        const getter = opts.base as AnyObjGetter;
        instanceOpts.base = getter(_context);
      }

      return createMock(provide.name, instanceOpts);
    },

    set context(context) {
      _context = context;
    },
  };
}

function resetObservable(mock: Mock, name) {
  const subject = new ReplaySubject();
  const spy = mock[name];
  spy.calls.reset();
  spy.and.returnValue(subject);
  mock._subjects[name] = subject;
}

export {
  createMock,
  createMockProvider,
  resetObservable,
  Mock,
  MockProvider,
};
