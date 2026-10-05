# After it is on the hub

Your repository stays your trainer's home: fixes are made there and pulled into the hub, and the hub can push its own fixes back.

- **Where it appears:** an icon with your initials in your colour, inside the folder of your first category, with today's minutes under it. Trainers that belong together can share a sub-folder (`folders` and `folder` in `shell/js/catalog.js`), as Relation Streams and Relational N-back do inside RRT.
- **Updates:** run `node tools/check-trainer.mjs <dir> --update`, push to your repository, then open a pull request on the hub that runs `tools/sync.sh pull <id>` (or ask a leader to). Changes to the hub always go through a pull request a code owner approves.
- **Changing your data:** add new measures under `extra`; never repurpose a column or change a session's id. The archive keeps every record it has read.
- **Retiring:** a retired trainer loses its icon, never its records; the record-format reader stays, so years of someone's training remain readable.
