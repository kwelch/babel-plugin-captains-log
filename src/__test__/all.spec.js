import path from "path";
import { testFile } from "./run_spec.js";

testFile(path.resolve(__dirname, "__fixtures__"), "all.js", "all", null, true);
