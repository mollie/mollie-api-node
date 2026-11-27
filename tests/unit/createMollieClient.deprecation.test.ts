import type createMollieClientType from '../..';

function loadCreateMollieClient(): typeof createMollieClientType {
  let loaded!: typeof createMollieClientType;
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    loaded = require('../..').default;
  });
  return loaded;
}

describe('createMollieClient deprecation warning', () => {
  const apiKey = 'test_dummydummydummydummydummy00';
  const originalNodeEnv = process.env.NODE_ENV;
  const originalSuppress = process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING;
  let emitWarningSpy: jest.SpyInstance;

  beforeEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING;
    emitWarningSpy = jest.spyOn(process, 'emitWarning').mockImplementation(() => {});
  });

  afterEach(() => {
    emitWarningSpy.mockRestore();
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalNodeEnv;
    }
    if (originalSuppress === undefined) {
      delete process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING;
    } else {
      process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING = originalSuppress;
    }
  });

  it('emits a DeprecationWarning once per process outside production', () => {
    const createMollieClient = loadCreateMollieClient();

    createMollieClient({ apiKey });
    createMollieClient({ apiKey });

    expect(emitWarningSpy).toHaveBeenCalledTimes(1);
    expect(emitWarningSpy).toHaveBeenCalledWith(expect.stringContaining('mollie-api-typescript'), 'DeprecationWarning', 'MOLLIE_LEGACY_SDK');
  });

  it('does not emit a warning when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    const createMollieClient = loadCreateMollieClient();

    createMollieClient({ apiKey });

    expect(emitWarningSpy).not.toHaveBeenCalled();
  });

  it('does not emit a warning when MOLLIE_SUPPRESS_DEPRECATION_WARNING is set', () => {
    process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING = '1';
    const createMollieClient = loadCreateMollieClient();

    createMollieClient({ apiKey });

    expect(emitWarningSpy).not.toHaveBeenCalled();
  });

  it('still emits a warning when MOLLIE_SUPPRESS_DEPRECATION_WARNING is "0" or "false"', () => {
    process.env.MOLLIE_SUPPRESS_DEPRECATION_WARNING = 'false';
    const createMollieClient = loadCreateMollieClient();

    createMollieClient({ apiKey });

    expect(emitWarningSpy).toHaveBeenCalledTimes(1);
  });

  it('does not emit a warning if credential validation fails', () => {
    const createMollieClient = loadCreateMollieClient();

    expect(() => createMollieClient({ apiKey: '' })).toThrow();
    expect(emitWarningSpy).not.toHaveBeenCalled();
  });
});
