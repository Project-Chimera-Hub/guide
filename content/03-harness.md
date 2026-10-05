# The harness

The harness (`shared/harness/` in the hub) is plain JavaScript with no dependencies: you write one `Harness.start({...})` call whose `session` function runs the trials, and it handles everything else.

## What it does for you

- **Screens:** home (level, sessions, minutes), How it works, Settings, the session, Results, and History with an **Export record** button.
- **The hub's look** (`harness.css`): gold on near-black, one monospace face, square corners, at phone and desk sizes.
- **Input:** response buttons that are also keys; response times measured from the moment you ask for a response.
- **Pausing:** on Escape, on the Pause button, and whenever the page is hidden (the hub hides a trainer when the player goes back to the menu). Every wait and response window stops with it, and paused time is never counted.
- **The level:** kept between sessions and moved after each completed one, by a default rule or yours.
- **The record:** every session saved in the [Chimera record format](record-format.html), with trials, accuracy, signal-detection counts, d′ and response times worked out from your trial log.
- **Settings:** a settings screen generated from a list you write, saved per trainer.

It never touches the network or another app's storage. Copy the `harness/` folder into your trainer (`new-trainer.mjs` does) and load it in this order:

```html
<link rel="stylesheet" href="harness/harness.css">
<div id="app"></div>
<script src="harness/record.js"></script>
<script src="harness/harness.js"></script>
<script src="trainer.js"></script>
```

## The smallest trainer

```js
Harness.start({
  id: "my-trainer", name: "My Trainer", unit: "n",
  level: { start: 1, min: 1, max: 9 },
  buttons: [{ id: "yes", label: "Match", key: "f" }],
  async session(s) {
    for (let i = 0; i < 20; i++) {
      const target = i % 3 === 0;
      s.show("<div class='h-stim'>" + i + "</div>");
      const r = await s.respond({ timeoutMs: 2000 });
      s.log({ target, response: r && r.id, correct: target === !!r, rtMs: r && r.rtMs });
    }
  },
});
```

## Harness.start options

| Option | Required | What it does |
| --- | --- | --- |
| `id` | yes | Your trainer's id: lower-case letters, digits, dashes. Names the storage keys. |
| `name` | yes | Shown as the title and the page's tab title. |
| `session(s)` | yes | An async function that runs one session's trials (see the session API). |
| `what` | | One line under the title on the home screen. |
| `version` | | Your version string, saved as `appVersion` in the record. |
| `unit` | | What `level` is measured in (`"n"`, `"target-ms"`). Required if you use `level`. |
| `level` | | `{ start, min, max, step, up, down }`. Turns on the level. `up`/`down` are the accuracy thresholds for the default rule (0.8 / 0.6). |
| `adapt(stats, level, settings)` | | Your own level rule: return the next level. Without it, the level rises by `step` at 80% accuracy or better and falls under 60%. |
| `instructions` | | HTML for the How it works screen. |
| `settings` | | A list of settings (table below). |
| `buttons` | | Response buttons: `[{ id, label, key }]`. Change them mid-session with `s.buttons(...)`. |
| `mode`, `modalities` | | Defaults saved with each session; a session can override them. |

## Settings entries

| Field | Meaning |
| --- | --- |
| `key` | Name you read it by: `s.settings.<key>`. |
| `label` | Shown on the Settings screen. |
| `type` | `"number"` (default), `"select"` or `"boolean"`. |
| `default` | Its value until the player changes it. |
| `min`, `max`, `step` | For numbers; values are clamped. |
| `options` | For selects: `[{ value, label }]`. |
| `about` | Optional help text under the field. |

## The session API

Your `session` function receives `s`:

| Member | What it is |
| --- | --- |
| `s.settings` | The settings for this session (read-only). |
| `s.level` | The level this session starts at. |
| `s.stage` | The element trials are drawn in. |
| `s.show(htmlOrNode)` | Replace what is on the stage. |
| `await s.wait(ms)` | Wait `ms` of active time; stops while paused. |
| `await s.respond({ timeoutMs, accept, stage })` | Wait for a button or its key (or a tap on the stage if `stage: true`). Resolves to `{ id, rtMs }`, or `null` after `timeoutMs` with no response. `rtMs` counts from this call, so call it the moment the stimulus appears. `accept` limits which button ids count. |
| `s.log(row)` | Add a trial to the log. `i` and `t` are filled in if you leave them out. Columns: see [the record format](record-format.html#trials-one-row-per-stimulus). |
| `s.feedback(ok)` | A short right/wrong flash on the stage. |
| `s.buttons(list)` | Replace the response buttons. |
| `s.now()` | Active milliseconds since the session began. |
| `s.audio.tone(hz, ms, gain)` | A sine tone; `s.audio.unlock()` is called for you on Start. |
| `s.Quit` | What `wait` and `respond` reject with when the player ends the session. |

If the player ends a session early, the pending `wait` or `respond` rejects with `s.Quit`; let it propagate and the harness saves the session as not completed. A session under 10 seconds with no trials is discarded as a mis-click.

## What session may return

All optional: `{ mode, modalities, levelEnd, score, extra, completed }`. `levelEnd` sets the next level directly instead of `adapt`; `extra` holds anything else your trainer measures; `completed: false` marks a session that did not finish. The level moves only after a completed session.

## Storage and helpers

- The record lives under `chimera.<id>.record.v1` and settings under `chimera.<id>.settings.v1`; the current level is in the record's `state.level`.
- Also exported: `Harness.summarize(log)` (the statistics it saves), `Harness.staircase`, `Harness.probit` and `Harness.audio`.
- The full commented source is [shared/harness/harness.js](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/shared/harness/harness.js); a complete example is [templates/trainer/trainer.js](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/templates/trainer/trainer.js).
