# Captain's Log (☠️)

[![version](https://img.shields.io/npm/v/babel-plugin-captains-log.svg?style=flat-square)](http://npm.im/babel-plugin-captains-log)
[![downloads](https://img.shields.io/npm/dm/babel-plugin-captains-log.svg?style=flat-square)](http://npm-stat.com/charts.html?package=babel-plugin-captains-log)
[![Travis Build Status](https://img.shields.io/travis/kwelch/babel-plugin-captains-log.svg?style=flat-square)](https://travis-ci.org/kwelch/babel-plugin-captains-log)
[![codecov](https://codecov.io/gh/kwelch/babel-plugin-captains-log/branch/master/graph/badge.svg)](https://codecov.io/gh/kwelch/babel-plugin-captains-log)

[![MIT License](https://img.shields.io/npm/l/kwelch.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Roadmap](https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square)]([roadmap])
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Watch on GitHub](https://img.shields.io/github/watchers/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/kwelch/babel-plugin-captains-log.svg?style=social)](https://github.com/kwelch/babel-plugin-captains-log/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/kwelch/babel-plugin-captains-log.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-plugin-captains-log!%20https://github.com/kwelch/babel-plugin-captains-log%20%F0%9F%91%8D)

## Usage

`babel-plugin-captains-log` injects helpful details into console statements.

Current version only injects the console statments scope. 

**Transforms**
```
function add(a, b) {
  console.log(a, b);
  return a + b;
}

const subtract = (a, b) => {
  console.log(a, b);
  return a - b;
};
```

**Into**
```
function add(a, b) {
  console.log("add:", a, b);
  return a + b;
}

const subtract = (a, b) => {
  console.log("subtract:", a, b);
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
Settings and options are below.


## Roadmap

- [] Handle alias for console/ desctructored methods
- [] Arrow functions within classes (stage-2 integration)
- [] Add config for methods
- [] Add ability to label variables in console statments
- [] Add ability to timestamp console statements
- [] Add ability to auto add console statements to methods

## License

MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/1295580?v=3" width="100px;"/><br /><sub>Kyle Welch</sub>](http://www.krwelch.com)<br />[💻](https://github.com/Kyle Welch <kyle@krwelch.com> (http://www.krwelch.com/)/babel-plugin-captains-log/commits?author=kwelch "Code") [📖](https://github.com/Kyle Welch <kyle@krwelch.com> (http://www.krwelch.com/)/babel-plugin-captains-log/commits?author=kwelch "Documentation") [⚠️](https://github.com/Kyle Welch <kyle@krwelch.com> (http://www.krwelch.com/)/babel-plugin-captains-log/commits?author=kwelch "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!


[roadmap]: https://github.com/kwelch/babel-plugin-captains-log#roadmap
