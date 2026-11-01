import { Config } from "@remotion/cli/config";

// PNG keeps the graphite line crisp for the scroll sequence.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
// transparent output is off — we want the off-white paper baked in so the
// site's `multiply` blend hides the white and shows only the line.
Config.setPixelFormat("yuv420p");
