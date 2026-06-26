import createMollieClient from '../..';

/**
 * The client refuses to run in a browser-like environment (where the API key would be exposed) unless
 * `dangerouslyAllowBrowser` is set. The check keys on `window.document` + `navigator`, so non-browser server runtimes
 * (Node, Bun, Deno, edge) are not flagged. See the `isBrowserLike` guard in `createMollieClient`.
 */
describe('createMollieClient browser guard', () => {
  const apiKey = 'test_dummydummydummydummydummy00';
  const globals = globalThis as Record<string, unknown>;
  let teardown: Array<() => void> = [];

  // Set a global, recording how to restore it afterwards.
  const define = (key: string, value: unknown) => {
    const had = key in globals;
    const previous = globals[key];
    teardown.push(() => {
      if (had) {
        globals[key] = previous;
      } else {
        delete globals[key];
      }
    });
    globals[key] = value;
  };

  // navigator exists as a global from Node 21 onwards but not on older versions, so define it only when absent.
  const simulateBrowser = () => {
    define('window', { document: {} });
    if (typeof navigator == 'undefined') {
      define('navigator', { userAgent: 'Mozilla/5.0 (test browser)' });
    }
  };

  afterEach(() => {
    teardown.forEach(restore => restore());
    teardown = [];
  });

  it('throws in a browser-like environment', () => {
    simulateBrowser();
    expect(() => createMollieClient({ apiKey })).toThrow(/browser-like environment/);
  });

  it('does not throw in a browser-like environment when dangerouslyAllowBrowser is true', () => {
    simulateBrowser();
    expect(() => createMollieClient({ apiKey, dangerouslyAllowBrowser: true })).not.toThrow();
  });

  it('does not throw in a non-browser server runtime', () => {
    expect(() => createMollieClient({ apiKey })).not.toThrow();
  });
});
