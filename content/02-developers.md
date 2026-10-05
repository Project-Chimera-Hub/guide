# Developers

You build a trainer in your own public repository, it passes an automated check, a hub leader approves it, and it is grafted into the hub with its history intact.

A trainer on the hub is a static web page (with or without a build step) that runs offline, inside a frame, on phones and desktops. It must save every session in the **[Chimera record format](record-format.html)**, so the hub can count its minutes, archive its sessions and include it in Share your data without anyone writing extra code. **[The harness](harness.html)** is a small JavaScript library that gives you all of that, plus the screens, pausing, timing, settings and the hub's look, so your code is only the trials themselves.

You do not have to use the harness: any trainer that meets [the criteria](criteria.html) is welcome. Using it meets most of them for you.

## Quick start

Seven steps take you from nothing to a submitted trainer; the first gives you a working one in a minute.

1. Clone the hub and create your trainer from the template (Node.js 20 or newer):

    ```bash
    git clone https://github.com/Project-Chimera-Hub/ChimeraHub
    node ChimeraHub/tools/new-trainer.mjs my-trainer --name "My Trainer" --category nback \
         --what "One line on what it trains" --maintainer your-github-name
    ```

    This writes `my-trainer/`: a complete Posner cueing trainer on the harness, with the harness copied into `my-trainer/harness/`.
2. Open `my-trainer/index.html` in a browser and play a session.
3. Replace the inside of `session` in `trainer.js` with your own trials; adjust `unit`, `level`, `settings` and `buttons`.
4. Fill in `README.md` and [`chimera.json`](manifest.html).
5. Play a real session, then **History → Export record**, and save the file as `my-trainer/test/sample-record.json`.
6. Run the check until every requirement passes:

    ```bash
    node ChimeraHub/tools/check-trainer.mjs my-trainer --browser
    ```

    `--browser` needs Playwright: `npm i -D playwright && npx playwright install chromium`.
7. Push `my-trainer` to its own public GitHub repository, tag the version (`git tag v1.0.0 && git push --tags`), and open a [Submit a trainer](https://github.com/Project-Chimera-Hub/ChimeraHub/issues/new?template=submit-trainer.yml) issue. What happens next is in [Submitting](submitting.html).
