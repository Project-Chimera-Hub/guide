# Chimera Hub guide

The guide to [Chimera Hub](https://project-chimera-hub.github.io/ChimeraHub/) for first users, and everything a developer needs to add a trainer.

**Read it:** <https://project-chimera-hub.github.io/guide/>

## Editing

Each page is a Markdown file in `content/`, named `NN-name.md`: the number sets its place in the navigation, the name its address (`name.html`; the first page is the home page), and its first line, `# Title`, its title. Link between pages by their `.html` names: `[the harness](harness.html)`.

Edit a file (on GitHub, the pencil icon works) and commit to `main`: the **Publish the guide** workflow rebuilds the site and publishes it within a minute or two.

To preview locally:

```bash
npm ci
npm run build      # → _site/
npx serve _site    # or open _site/index.html
```

`assets/` holds the stylesheet (the hub's look: gold on black, monospace, square corners), the favicon and the submission flow drawing, `assets/flow.svg`.

The guide describes the hub's code; when the harness, the record format or the criteria change in [ChimeraHub](https://github.com/Project-Chimera-Hub/ChimeraHub), update the matching page here.
