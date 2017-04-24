function argsIsNotArray() {
  console.warn;
}

function consoleAssigned() {
  const c = console;
  c.warn("not prepended becase we don't catch assignements");
}
