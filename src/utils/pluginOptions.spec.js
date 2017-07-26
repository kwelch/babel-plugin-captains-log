import { buildOptions } from './pluginOptions';

describe('buildOptions', () => {
  test('should return defaults for invalid args', () => {
    let actual = buildOptions();
    expect(actual).toMatchSnapshot();
    actual = buildOptions(undefined);
    expect(actual).toMatchSnapshot();
    actual = buildOptions({});
    expect(actual).toMatchSnapshot();
    actual = buildOptions({ unknownFlag: false });
    expect(actual).toMatchSnapshot();
  });

  test('should allow methods to be changed', () => {
    let actual = buildOptions({ methods: ['debug'] });
    expect(actual).toMatchSnapshot();
  });

  test('should overwrite defaults', () => {
    let actual = buildOptions({ injectFileName: false });
    expect(actual).toMatchSnapshot();
  });
});
