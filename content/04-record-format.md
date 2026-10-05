# The record format

Every trainer saves its sessions as one JSON value under `chimera.<id>.record.v1` in localStorage; the hub's meter, the archive, the desktop gate and Share your data all find and read it with no code from you.

It is a table of sessions, each with an optional table of trials. Columns are fixed; **most may be empty** (left out or `null`), which means "this trainer does not measure that", never zero. [The harness](harness.html) writes it for you. The validator is `shared/harness/record.js` (`ChimeraRecord.validate(record)`), and [FORMAT.md](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/shared/harness/FORMAT.md) is the full specification with a complete example.

## The file

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `format` | string | yes | Always `"chimera-record"`. |
| `version` | integer | yes | Always `1`. |
| `app` | string | yes | Your trainer's id (the same as in `chimera.json`). |
| `appVersion` | string | | Your trainer's version. |
| `units` | object | yes | `units.level` names what `level` is in; `units.score` if you report a score. |
| `sessions` | array | yes | One entry per session, oldest first. |
| `state` | object | | Current standing, e.g. the next level. |

## Sessions: one row per sitting, block or game

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | yes | Unique and permanent within the app. |
| `start` | time | yes | Start, epoch milliseconds UTC. |
| `end` | time | | End, epoch ms UTC. |
| `activeSeconds` | number | yes | Seconds actually trained, pauses excluded. This is what the meter counts. |
| `completed` | boolean | | Finished rather than abandoned. |
| `mode` | string | | Mode or variant, as the player sees it. |
| `modalities` | array | | Streams in play, e.g. `["position","audio"]`. |
| `level`, `levelEnd` | number | | Difficulty at start and end, in `units.level`. |
| `levelUnit` | string | | Overrides `units.level` for this session. |
| `trials`, `correct` | integer | | Trials presented, and how many were right. |
| `accuracy` | fraction | | 0 to 1 (not a percentage). |
| `hits`, `misses`, `falseAlarms`, `correctRejections` | integer | | Signal-detection counts. |
| `dPrime` | number | | Sensitivity. |
| `rtMeanMs`, `rtMedianMs`, `rtSdMs` | number | | Response times, ms. |
| `score` | number | | Any other headline number, in `units.score`. |
| `input` | string | | `keyboard`, `touch`, `mouse` or `voice`. |
| `settings` | object | | The settings in force. |
| `extra` | object | | Anything else your trainer measures. |
| `trialLog` | array | | One row per trial (below). |

## Trials: one row per stimulus

For a multi-stream n-back, write one row per stream per trial, with `modality` saying which.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `i` | integer | yes | Position in the session, from 0. |
| `t` | number | | Ms from session start to the stimulus. |
| `block` | integer | | Block within the session. |
| `level` | number | | Difficulty on this trial. |
| `modality` | string | | Which stream this row is about. |
| `stimulus` | any | | What was shown or played. |
| `target` | boolean | | Whether a response was called for. |
| `response` | any | | What the player did; empty for none. |
| `correct` | boolean | | Whether that was right. |
| `rtMs` | number | | Response time, ms; empty for none. |
| `extra` | object | | Anything else about this trial. |

## The rules

1. **A level always has a unit.** The archive stores it as `<app>-<unit>`, so no two trainers' units are ever put on one axis.
2. **Ids are forever.** Re-importing the same record must change nothing.
3. **`activeSeconds` is training time only.** Stop the clock when the page is hidden, a menu is open, or results are showing.
4. **Days are UTC.** A session counts on the UTC day of its `start`.
5. **No personal data.** No names, typed text or device ids.
6. **Keep the history.** Do not trim old sessions; a field that is not a column goes in `extra`.
