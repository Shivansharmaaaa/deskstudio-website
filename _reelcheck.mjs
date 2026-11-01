import { bundle } from "@remotion/bundler";
import path from "path";
const out = await bundle({ entryPoint: path.resolve("remotion/index.js"), onProgress: () => {} });
console.log("BUNDLE_OK", out.split("/").pop());
