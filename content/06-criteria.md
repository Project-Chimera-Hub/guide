# The criteria

A trainer must meet every **Required** item. `tools/check-trainer.mjs` tests every row marked Check, and a hub leader judges the Reviewer rows by playing it.

| Criterion | Level | Checked by |
| --- | --- | --- |
| Has a valid `chimera.json`, with an id not already on the hub | Required | Check |
| Opens from `index.html` (or declares a `build`) | Required | Check |
| Loads every asset by a relative path | Required | Check |
| Loads nothing from the network: no CDNs, web fonts, remote images or sounds, `fetch` calls | Required | Check |
| No analytics, trackers or API keys | Required | Check |
| Saves sessions in the Chimera record format | Required | Check |
| Includes `test/sample-record.json` from a real session, and it validates | Required | Check |
| Pauses, and stops counting time, when the page is hidden | Required | Check |
| Stays in its frame: no `top`/`parent` access, no `target="_top"` | Required | Check |
| Loads in Chromium offline, without errors, and does not scroll sideways at 360px | Required | Check (`--browser`) |
| Has an OSI-approved license covering every asset | Required | Check |
| Has a README | Required | Check |
| No template placeholders left | Required | Check |
| Under 25 MB without `node_modules` | Required | Check |
| Own storage keys named `chimera.<id>.…` | Recommended | Check |
| Has a viewport meta tag for phones | Recommended | Check |
| README has *What it trains*, *How difficulty is measured*, *Controls* | Recommended | Check |
| No single file over 5 MB | Recommended | Check |
| Includes a trial log in its records | Recommended | Reviewer |
| Trains something: a known paradigm or clear rationale, not a reskin of a trainer already here | Required | Reviewer |
| Difficulty adapts: beginners can start, strong players stay challenged | Required | Reviewer |
| Playable: clear instructions, immediate feedback, nothing ambiguous under time pressure | Required | Reviewer |
| Accessible: colour never the only cue, sound-only trainers say so, touch targets at least 44px | Required | Reviewer |
| Honest: no claims beyond the evidence, no dark patterns, no personal data | Required | Reviewer |

The check reads your code and never runs your build; `--browser` loads the page in headless Chromium, served from a sub-folder as the hub serves it. Exit status 0 means every required item it tests passed.
