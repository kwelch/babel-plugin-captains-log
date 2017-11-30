const defaultSettings = {
  injectScope: false,
  injectVariableName: true,
  injectFileName: true,
  useFileNameRelativeToProjectRoot: false,
};

const defaultMethods = ['debug', 'error', 'exception', 'info', 'log', 'warn'];

// this should deep merge in the furture when we are dealing with more than just flags
const mergeOptions = options => {
  const sanitizedOptions = Object.keys(options || {})
    .filter(key => Object.keys(defaultSettings).includes(key))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: options[key],
      }),
      {}
    );
  return Object.assign({}, defaultSettings, sanitizedOptions);
};

export const buildOptions = userOptions => {
  // remove ignore patterns from settings since it has been consumed already
  // eslint-disable-next-line no-unused-vars
  const { methods, ignorePatterns, ...options } = userOptions || {};

  // output spreads the flags over each method
  // in the future this could be expanded to allow method level config
  return (methods || defaultMethods).reduce((acc, method) => {
    return {
      ...acc,
      [method]: mergeOptions(options),
    };
  }, {});
};
