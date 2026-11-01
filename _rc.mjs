import { bundle } from "@remotion/bundler";
import path from "path";
await bundle({ entryPoint: path.resolve("remotion/index.js"), onProgress: () => {} });
console.log("BUNDLE_OK");
