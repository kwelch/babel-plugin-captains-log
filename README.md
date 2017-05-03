# Captain's Log (☠️)

[![Join the chat at https://gitter.im/babel-plugin-captains-log/Lobby](https://badges.gitter.im/babel-plugin-captains-log/Lobby.svg)](https://gitter.im/babel-plugin-captains-log/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![version](https://img.shields.io/npm/v/babel-plugin-captains-log.svg?style=flat-square)](http://npm.im/babel-plugin-captains-log)
[![downloads](https://img.shields.io/npm/dm/babel-plugin-captains-log.svg?style=flat-square)](http://npm-stat.com/charts.html?package=babel-plugin-captains-log)
[![Travis Build Status](https://img.shields.io/travis/kwelch/babel-plugin-captains-log.svg?style=flat-square)](https://travis-ci.org/kwelch/babel-plugin-captains-log)
[![codecov](https://codecov.io/gh/kwelch/babel-plugin-captains-log/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/kwelch/babel-plugin-captains-log)

[![MIT License](https://img.shields.io/npm/l/kwelch.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Roadmap](https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square)]([roadmap])
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

[![Watch on GitHub](https://img.shields.io/github/watchers/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/kwelch/babel-plugin-captains-log.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-plugin-captains-log!%20https://github.com/kwelch/babel-plugin-captains-log%20%F0%9F%91%8D)

## Usage

`babel-plugin-captains-log` injects helpful details into console statements.

Default bahavior:
- Prepend console statement scope
- add inject variable name into console statements

**Transforms**
```diff
function add(a, b) {
-  console.log(a, b);
+  console.log("simple.js(2:2)", "add:", "a", a, "b", b);
  return a + b;
}

const subtract = (a, b) => {
-  console.log(a, b);
+  console.info("simple.js(7:2)", "subtract:", "a", a, "b", b);
  return a - b;
};
```

See the [Roadmap][roadmap] for a future features and oppurtunities to contribute.

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
  plugins: ["captains-log"]
}
```

## Options

### Methods
This option provides control over which console statments are adjusted. Methods is set within your `.babelrc` as an array.

**Default**: `["debug", "error", "exception", "info", "log", "warn"]`

```
{
  plugins: [
    ["captains-log", {
      methods: ['debug', 'info']
    }]
  ]
}
```

### Flags
Flags are values set for all methods and are used to turn that feature on or off. Flags are not merged with defaults to allow for maximum control.


#### Variable Name
**Default**: `true`

```
{
  plugins: [
    ["captains-log", {
      injectVariableName: true
    }]
  ]
}
```

#### Inject Scope
**Default**: `true`

```
{
  plugins: [
    ["captains-log", {
      injectScope: true
    }]
  ]
}
```

#### Inject File Name
**Default**: `true`

```
{
  plugins: [
    ["captains-log", {
      injectFileName: true
    }]
  ]
}
```

## Roadmap

- [ ] Add ability to timestamp console statements

## License

MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/1295580?v=3" width="100px;"/><br /><sub>Kyle Welch</sub>](http://www.krwelch.com)<br />[💻](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Code") [📖](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Documentation") [⚠️](https://github.com/kwelch/babel-plugin-captains-log/commits?author=kwelch "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!


[roadmap]: https://github.com/kwelch/babel-plugin-captains-log#roadmap
