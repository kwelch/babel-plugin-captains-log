function argsIsNotArray() {
  console.warn;
}

function consoleAssigned() {
  const c = console;
  // see [#4](https://github.com/kwelch/babel-plugin-captains-log/issues/4)
  c.warn("not prepended because we don't catch assignments");
}
