# Gold SMC Backtester (PWA)

Bias-free XAU/USD replay backtester with Smart-Money-Concepts drawing tools. Runs entirely in the browser.

**Install on iPad/iPhone:** open the site in Safari → Share → **Add to Home Screen**.

- Journal, drawings and the API key stay on the device (localStorage / IndexedDB) — nothing is sent anywhere except your own Twelve Data requests.
- **⟳ Refresh data** fetches ~6 months of candles from Twelve Data using your key (free tier, ~9 min).
- Export CSV/JSON regularly — the journal lives only on the device.

Deploying a new bundled `backtester_data.js`: bump `CACHE` in `sw.js` so installed apps pick it up.
