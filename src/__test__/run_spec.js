import path from "path";
import fs from "fs";
import * as babel from "babel-core";
import PLUGIN from "../index";

const dirname = path.resolve(__dirname, "./__fixtures__");

export default function run_spec(name, options) {
  fs.readdirSync(dirname).forEach(filename => {
    if (filename === "all.js") {
      return;
    }
    testFile(dirname, filename, name, options);
  });
}

export function testFile(dirname, filename, testName, options, useBabelRC) {
  const source = read(path.resolve(dirname, filename));
  const output = transform(filename, source, options, useBabelRC);
  test(`${filename}-transform: ${testName}`, () => {
    expect(source + "~".repeat(80) + "\n" + output).toMatchSnapshot(filename);
  });
}

export function read(filename) {
  return fs.readFileSync(filename, "utf8");
}

export function transform(filename, source, options = {}, useBabelRC = false) {
  const { code } = babel.transform(source, {
    filename: filename,
    babelrc: useBabelRC,
    // usage with stage-2 doesn't work, scope is set to constructor instead of arrow functions
    // presets: ["stage-2"],
    plugins: [[PLUGIN, options]],
  });
  return code;
}
