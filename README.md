# Captain's Log (☠️)

[![version](https://img.shields.io/npm/v/babel-plugin-captains-log.svg?style=flat-square)](http://npm.im/babel-plugin-captains-log)
[![downloads](https://img.shields.io/npm/dm/babel-plugin-captains-log.svg?style=flat-square)](http://npm-stat.com/charts.html?package=babel-plugin-captains-log)
[![Travis Build Status](https://img.shields.io/travis/kwelch/babel-plugin-captains-log.svg?style=flat-square)](https://travis-ci.com/kwelch/babel-plugin-captains-log.svg)
[![codecov](https://codecov.io/gh/kwelch/babel-plugin-captains-log/branch/main/graph/badge.svg?style=flat-square)](https://codecov.io/gh/kwelch/babel-plugin-captains-log)

[![MIT License](https://img.shields.io/npm/l/kwelch.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

[![Watch on GitHub](https://img.shields.io/github/watchers/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/kwelch/babel-plugin-captains-log.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-plugin-captains-log!%20https://github.com/kwelch/babel-plugin-captains-log%20%F0%9F%91%8D)

## Usage

`babel-plugin-captains-log` injects helpful details into console statements.

Default behavior:

- prepend console statement file & location
- add inject variable name into console statements

**Transforms**

```diff
function add(a = 1, b = 2) {
  console.log(a); // outputs: 1
  return a + b;
}
↓ ↓ ↓ ↓ ↓ ↓
function add(a = 1, b = 2) {
  console.log("simple.js(2:2)", "a", a); // outputs: "simple.js(2:2)" "a" 1
  return a + b;
}
```

See the [Issues][issues] for a future features and opportunities to contribute.

## Requirements

This is a Babel plugin so it requires Babel v6 to run.

## Installation

This module is distributed using npm which comes bundled with node:

```
npm install --save-dev babel-plugin-captains-log
```

To include the plugin in your project, create or open your .babelrc file at the root of your project. Then, add namespaces to your plugin list:

```
{
  plugins: ["babel-plugin-captains-log"]
}
```

## Options

### Methods

This option provides control over which console statements are adjusted. Methods is set within your `.babelrc` as an array.

**Default**: `["debug", "error", "exception", "info", "log", "warn"]`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "methods": ['debug', 'info']
    }]
  ]
}
```

### Ignore Patterns

This option provides control over which files are adjusted. Ignore Patterns is set within your `.babelrc` as an array of strings.

**Default**: `["node_modules"]`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "ignorePatterns": ["node_modules", ".spec.js"]
    }]
  ]
}
```

### Use a logger other then console

This option provides control over which files are adjusted. Ignore Patterns is set within your `.babelrc` as an array of strings.

**Default**: `"console"`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "loggerName": "logger"
    }]
  ]
}
```

### Flags

Flags are values set for all methods and are used to turn that feature on or off. Flags are not merged with defaults to allow for maximum control.

#### Variable Name Labels

**Default**: `true`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "injectVariableName": true
    }]
  ]
}
```

#### File Location Data

**Default**: `true`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "injectFileName": true
    }]
  ]
}
```

#### Inject Scope _(Experimental)_

_This has a few issues with other plugins particularly react-hot-loader, as it changes method names. Also, it was written for recursion which adds too much noise to the console statement which is against this libraries purpose_

**Default**: `false`

```
{
  plugins: [
    ["babel-plugin-captains-log", {
      "injectScope": true
    }]
  ]
}
```

## License

MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars0.githubusercontent.com/u/1295580?v=3" width="100px;"/><br /><sub>Kyle Welch</sub>](http://www.krwelch.com)<br />[💻](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Code") [📖](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Documentation") [⚠️](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Tests") | [<img src="https://avatars1.githubusercontent.com/u/9456433?v=4" width="100px;"/><br /><sub>Maksim</sub>](https://github.com/mqklin)<br />[🐛](https://github.com/kwelch/babel-plugin-captains-log/issues?q=author%3Amqklin "Bug reports") |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

[issues]: https://github.com/kwelch/babel-plugin-captains-log/issues
