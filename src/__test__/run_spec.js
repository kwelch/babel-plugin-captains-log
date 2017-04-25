import path from "path";
import fs from "fs";
import * as babel from "babel-core";
import PLUGIN from "../index";

const dirname = path.resolve(__dirname, "./__fixtures__");

export default function run_spec(name, options) {
  fs.readdirSync(dirname).forEach(filename => {
    const source = read(`${dirname}/${filename}`);
    const output = transform(filename, source, options);
    test(`${filename}-transform: ${name}`, () => {
      expect(source + "~".repeat(80) + "\n" + output).toMatchSnapshot(filename);
    });
  });
}

function read(filename) {
  return fs.readFileSync(filename, "utf8");
}

function transform(filename, source, options = {}) {
  const { code } = babel.transform(source, {
    filename: filename,
    babelrc: false,
    // usage with stage-2 doesn't work, scope is set to constructor instead of arrow functions
    // presets: ["stage-2"],
    plugins: [[PLUGIN, options]]
  });
  return code;
}
