# Pinterest → reel image pipeline

Pulls images from your own Pinterest boards via the official **Pinterest API v5**
and saves them into `public/reel/pinterest/` (plus a `manifest.json`) so they can
be dropped into the Remotion reel.

> Pinterest has no ready MCP/connector, so this uses the official API directly.
> In "trial" access (default for a new app) you can read **your own** account's
> boards and pins — which is exactly what we need.

---

## 1. Create a Pinterest app (one time)

1. Go to https://developers.pinterest.com/apps/ and **Create app**.
2. Note your **App ID** and **App secret**.
3. Under the app's settings, add a **Redirect URI**:
   `http://localhost:8085/callback`
4. Make sure the app has scopes **`boards:read`** and **`pins:read`**.

## 2. Add your credentials

Copy `.env.example` to `.env` in this folder and fill in:

```
PINTEREST_APP_ID=...
PINTEREST_APP_SECRET=...
PINTEREST_REDIRECT_URI=http://localhost:8085/callback
PINTEREST_ACCESS_TOKEN=        # filled in step 3
```

## 3. Authorize once (get an access token)

```bash
# from the project root
node scripts/pinterest/auth.mjs url
```

Open the printed URL in your browser, approve, and Pinterest redirects to
`http://localhost:8085/callback?code=XXXX`. Copy the `code` value, then:

```bash
node scripts/pinterest/auth.mjs token XXXX
```

It prints an **access token** — paste it into `.env` as `PINTEREST_ACCESS_TOKEN`.
(Tokens expire; re-run this if calls start failing.)

## 4. Find your board, then fetch its images

```bash
node scripts/pinterest/fetch-board.mjs boards          # lists your boards + IDs
node scripts/pinterest/fetch-board.mjs <BOARD_ID> 24   # downloads up to 24 images
```

Images land in `public/reel/pinterest/` and a `manifest.json` lists them with
their titles/links. Tell me when they're there and I'll:
- use them as **style references** (palette / composition) for the reel, and
- wire the ones you pick into reel scenes (gallery, backgrounds, mockups).

Reminder: only embed pins you own or that are licensed — most Pinterest images
are third-party copyrighted photos and aren't cleared for a commercial reel.
