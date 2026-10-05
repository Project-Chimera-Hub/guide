# Submitting and approval

A submitted trainer needs the automated check to pass and two approvals from a hub leader before it appears on the hub.

<div class="figure"><img src="assets/flow.svg" alt="Open a Submit a trainer issue; the automated check runs and reports; if it fails, fix it in your repository and comment /recheck; if it passes, a leader plays it and adds the approved label; it is grafted into a pull request; a leader reviews and merges it; it is on the hub."></div>

- **The check** clones your repository, runs `check-trainer.mjs --browser` and posts its report on your issue, labelled `ready-for-review` or `needs-changes`. Editing the issue or commenting `/recheck` runs it again. It never runs your build.
- **First approval:** a leader plays the trainer and adds the `approved` label; only maintainers and admins can.
- **The import** grafts your repository into `apps/<id>/` with its history, adds your icon to the catalog, runs the hub's tests and opens a pull request.
- **Second approval:** a code owner reviews and merges that pull request, and the site redeploys with your trainer on it.

To start, open a [Submit a trainer](https://github.com/Project-Chimera-Hub/ChimeraHub/issues/new?template=submit-trainer.yml) issue with your repository's address and the tag to import.
