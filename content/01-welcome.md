# Chimera Hub

Chimera Hub is a free, offline collection of cognitive trainers with one shared training record. This guide explains it to new users, and tells developers everything they need to add a trainer.

## Why Chimera Hub

Standalone trainers each keep their data their own way, if they keep it at all; the hub gives every trainer one record you can actually use.

### For people who train

| | A standalone trainer | Chimera Hub |
| --- | --- | --- |
| Your data | Its own storage format, often with no export | One record format for every trainer: when, how long, mode, difficulty, accuracy, reaction times, signal detection |
| Using it | Copy numbers out by hand, if the app shows them | Download everything as one file or one CSV from **The record**, ready for a spreadsheet, R or Python |
| Comparing | Impossible: every app has its own scales and units | Sessions from different trainers sit side by side in the same columns, with units named |
| Training time | Counted per app, if at all | One daily total across all counted trainers, with an optional goal |
| Keeping history | Lost when an app is abandoned or its storage cleared | The archive keeps every record it has read, even after a trainer is retired |
| Finding trainers | Scattered sites of uneven quality | One place, sorted by what each trains; each one checked automatically and played by a leader before it appears |
| Privacy | Varies: accounts, analytics, ads | Nothing leaves your device; no accounts, trackers or ads, checked on every submission |
| Where it runs | Varies | Every trainer works offline, on phones and in the Android app |
| Look and feel | Different in every app | One look and one set of controls across the hub |

### For developers and researchers

| | A standalone trainer | Chimera Hub |
| --- | --- | --- |
| Building | Write timing, staircase, logging, saving and pause handling yourself | The harness does all of it; you write the trial |
| Data quality | Each app's data needs its own parser | One documented format with a validator; every trainer's data reads the same way |
| Reaching people | Promote it alone | It joins the hub's users, the APK and their daily routine |
| Research | Small, incompatible datasets | Optional anonymous sharing in one format, so sessions can be pooled across trainers and users |

## For first users

Open [the hub](https://project-chimera-hub.github.io/ChimeraHub/), tap a folder, tap a trainer, and train; your minutes count toward one daily total.

- **Trainers live in folders**, like apps on a phone: RRT (relational reasoning), N-back, CCT (cognitive control), ATT (attention), MOT (multiple object tracking), and more. Folders can hold folders: the Relational N-back folder sits inside RRT.
- **Today's minutes** show at the top and under each trainer. A trainer marked *Not counted* runs here, but its time is not added to the day yet.
- **Today's goal** sets a daily target in minutes, if you want one.
- **Your record stays on your device.** Nothing is sent anywhere. Open **The record** (the archive) and **download the file** now and then: clearing site data erases what the browser holds.
- **Share your data** is optional: it makes a file of your sessions (mode, difficulty, result, duration, day, a random ID) that you can upload to help tune the trainers.
- **Appearance** switches the background between Lake, Forest or a picture of your own.
- **It works offline** and on phones; an Android app (APK) is built from the same site.

Questions go to the [Discord](https://discord.com/invite/chmr).

## For developers

Anyone can build a trainer and submit it. Start with [Developers](developers.html), then read [the harness](harness.html), [the record format](record-format.html) and [the criteria](criteria.html).

## For leaders

Co-admins and anyone who approves trainers: see [For co-admins and approvers](approvers.html).
