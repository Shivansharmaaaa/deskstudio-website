import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.join(HERE, ".env");

// minimal .env loader (no dependency)
export async function loadEnv() {
  const env = { ...process.env };
  try {
    const raw = await fs.readFile(ENV_PATH, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].trim();
    }
  } catch {
    /* no .env yet */
  }
  return env;
}

export function need(env, key) {
  if (!env[key]) {
    console.error(`\n✗ Missing ${key}. Add it to scripts/pinterest/.env\n`);
    process.exit(1);
  }
  return env[key];
}

export const API = "https://api.pinterest.com/v5";

export async function api(env, endpoint) {
  const token = need(env, "PINTEREST_ACCESS_TOKEN");
  const res = await fetch(`${API}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Pinterest API ${res.status} on ${endpoint}: ${body}`);
  }
  return res.json();
}
