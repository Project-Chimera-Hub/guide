# chimera.json

Every trainer has a `chimera.json` at its repository's root; the check validates it and the import uses it to place your trainer on the hub.

```json
{
  "id": "my-trainer",
  "name": "My Trainer",
  "what": "One line on what it trains",
  "categories": ["nback"],
  "unit": "n",
  "license": "MIT",
  "maintainer": "your-github-name",
  "repository": "https://github.com/your-github-name/my-trainer",
  "build": null
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Lower-case letters, digits, dashes, starting with a letter. Not already on the hub. It is also your record's `app` and the folder name `apps/<id>/`. |
| `name` | yes | The name on your icon. |
| `what` | yes | One line, 90 characters at most, shown when hovering your icon. |
| `categories` | yes | The first is the folder your trainer sits in; any after it say what else it trains. One of `rrt`, `nback`, `cct`, `att`, `mot`, `posner`, `spatial`, `imagery`, `inhibition`, `speed`, `other`. |
| `unit` | | What your level is measured in; must match `units.level` in your sample record. |
| `license` | yes | An OSI-approved license (MIT, Apache-2.0, GPL-3.0…). |
| `maintainer` | yes | Your GitHub name. |
| `repository` | | `https://github.com/<owner>/<repo>`. |
| `build` | | `null` for plain pages; otherwise `{ "command": "npm run build", "output": "dist" }`. The build must run after `npm ci` and output a relative base (`./`). |
| `colour` | | A preferred icon colour; if it is taken, the hub picks a free one. |
| `audioOnly` | | `true` for a trainer that needs no input and plays on with the screen locked: it stops on the hub's `chimera:leave` message instead of when the page is hidden (see [the criteria](criteria.html)). |
