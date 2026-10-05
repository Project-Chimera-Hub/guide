# For co-admins and approvers

Leaders decide what reaches the hub. This page covers who counts as a leader, how to review a submission, and how to keep the catalog in order.

## Who can approve

Two GitHub permissions make someone a leader of [ChimeraHub](https://github.com/Project-Chimera-Hub/ChimeraHub). They need both:

| Step | Who can do it | Where it is set |
| --- | --- | --- |
| Add the `approved` label (first approval) | Repository role **Maintain** or **Admin** | Settings → Collaborators and teams |
| Approve the import pull request (second approval) | A **code owner** with write access | [.github/CODEOWNERS](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/.github/CODEOWNERS) |

If anyone else adds the `approved` label, the workflow removes it again and explains why on the issue.

**Adding a co-admin:**
1. Give them the **Maintain** role (or **Admin**, if they should also change settings).
2. Add their `@username` to every line of `CODEOWNERS`, in a pull request. With more than two or three leaders, create an organisation team (for example `@Project-Chimera-Hub/leaders`) and put the team on those lines instead.

**Merging your own pull requests:** GitHub never lets you approve your own pull request. On `main`, admins can bypass that rule; maintainers can't, so a maintainer's pull request needs another code owner to approve it.

## Reviewing a submission

<div class="figure"><img src="assets/flow.svg" alt="The submission flow, from issue to the hub."></div>

1. **Find it.** Open issues labelled [`ready-for-review`](https://github.com/Project-Chimera-Hub/ChimeraHub/issues?q=is%3Aopen+label%3Aready-for-review) have passed the automated check. Issues labelled `needs-changes` are waiting on their developer, so leave them be.
2. **Read the check's report** on the issue. Every Required row must pass; Recommended rows are worth a comment.
3. **Play it.** Clone the repository at the tag named in the issue and open `index.html`, or run its `build` command first. Play several sessions, including one on a phone. Then judge the Reviewer rows of [the criteria](criteria.html):
   - **Trains something:** a known paradigm or a clear rationale, and not a reskin of a trainer already on the hub.
   - **Difficulty adapts:** a beginner can start, and a strong player stays challenged.
   - **Playable:** the instructions are clear, feedback is immediate, and nothing is ambiguous under time pressure.
   - **Accessible:** colour is never the only cue, a sound-only trainer says so, and touch targets are at least 44px.
   - **Honest:** no claims beyond the evidence, no dark patterns, and no personal data collected.
4. **Check the data.** Finish a session, open **The record** on your local copy (or read `test/sample-record.json`), and confirm the sessions read sensibly. Mode, level and score should mean what the README says they mean.
5. **Decide:**
   - **Approve:** add the `approved` label.
   - **Ask for changes:** comment what to fix and swap the label to `needs-changes`. The developer fixes it in their repository and comments `/recheck`.
   - **Decline:** comment the reason kindly, then close the issue as *not planned*.

## The import pull request

Adding `approved` starts the import: it checks the trainer again at the same tag, grafts it into `apps/<id>/`, adds it to the catalog, runs the tests and opens a pull request titled **Hub: \<name\>** that closes the issue.

- **Review the diff.** Expect `apps/<id>/`, one new entry in `shell/js/catalog.js` and one in `tools/apps.json`. Check that the entry's categories and colour suit the hub, and edit them in the pull request if not.
- **Tests:** pull requests the workflow opens don't start CI on their own unless the repository secret `SUBMISSIONS_TOKEN` is set. Without it, push any commit to the branch (a catalog tweak will do) to start the tests.
- **Merge** once you approve and the tests pass. The site redeploys, and the trainer appears in its folder within a few minutes.
- **If the import fails,** the run under Actions → *Trainer submission* says why. Usually the id is already taken, or the tag changed and no longer passes the check. Fix the cause, then remove the `approved` label and add it again to retry.

## Keeping the catalog

[shell/js/catalog.js](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/shell/js/catalog.js) lists everything on the home screen, and every change to it goes through a pull request.

- **Move a trainer:** reorder its `categories`, since the first one is its folder. Set `folder` to put it in a sub-folder.
- **Add a folder:** add an entry to `folders` with an `id`, a `name`, a `parent` (a category or another folder) and an `about`.
- **Add a category:** add one to `categories`. Empty categories still show and invite submissions.
- **Never change an `id`** once a trainer has history: the archive finds each trainer's minutes by its id. Change the `name` instead.
- **Updates from a developer:** in a pull request, run `tools/sync.sh pull <id>` and then `node test/run.js`.
- **Retiring a trainer:** remove its catalog entry, but keep its archive adapter, so people's records stay readable.

## Editing this guide

This guide lives in [Project-Chimera-Hub/guide](https://github.com/Project-Chimera-Hub/guide). Edit a file in `content/` and commit to `main`, and the site rebuilds in about a minute. The repository's README explains how to add pages.
