/**
 * Pinterest OAuth helper.
 *   node scripts/pinterest/auth.mjs url           -> prints the authorize URL
 *   node scripts/pinterest/auth.mjs token <code>  -> exchanges code for a token
 */
import { loadEnv, need } from "./lib.mjs";

const SCOPES = "boards:read,pins:read";

const main = async () => {
  const env = await loadEnv();
  const cmd = process.argv[2];

  if (cmd === "url") {
    const appId = need(env, "PINTEREST_APP_ID");
    const redirect = need(env, "PINTEREST_REDIRECT_URI");
    const url =
      "https://www.pinterest.com/oauth/?" +
      new URLSearchParams({
        client_id: appId,
        redirect_uri: redirect,
        response_type: "code",
        scope: SCOPES,
        state: "deskstudio",
      }).toString();
    console.log("\nOpen this URL, approve, then copy the ?code= value:\n\n" + url + "\n");
    return;
  }

  if (cmd === "token") {
    const code = process.argv[3];
    if (!code) {
      console.error("Usage: node scripts/pinterest/auth.mjs token <code>");
      process.exit(1);
    }
    const appId = need(env, "PINTEREST_APP_ID");
    const secret = need(env, "PINTEREST_APP_SECRET");
    const redirect = need(env, "PINTEREST_REDIRECT_URI");
    const basic = Buffer.from(`${appId}:${secret}`).toString("base64");
    const res = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirect,
      }).toString(),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("\n✗ Token exchange failed:\n", data, "\n");
      process.exit(1);
    }
    console.log("\n✓ Access token (paste into scripts/pinterest/.env as PINTEREST_ACCESS_TOKEN):\n");
    console.log(data.access_token + "\n");
    if (data.refresh_token) console.log("(refresh token also returned: " + data.refresh_token + ")\n");
    return;
  }

  console.log("Usage:\n  node scripts/pinterest/auth.mjs url\n  node scripts/pinterest/auth.mjs token <code>");
};

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
