# Smplrspace docs

The public documentation site for smplr.js and the Smplrspace platform, built with Docusaurus 2 (`yarn start` to
develop, `yarn build` to build and check links). The docs describe the behaviour of smplr.js, whose code lives in
`smplrspace/smplrspace`, not in this repo.

## Git

- `next` is the default branch and where PRs merge. `main` is the release branch: a push to it deploys the site.
  Releases are PRs named `vX.Y.Z`, from `next` to `main`, opened by Thibaut.
- Never commit or push to `main` or `next`. Work on a branch cut from `next`.

## Before a PR

- Check every claim about what smplr.js does (options, defaults, limits, what is sent where) against the code in
  `smplrspace/smplrspace`, not against another docs page or a card. If it is not checked, say so in the PR.
- When the docs describe a change that is not released yet, name the smplr.js PR in the description and say the docs
  go out with it.

## Card workflow

Work on cards follows the `smplr:how-we-work` skill. Load it before starting card work, committing, pushing,
opening a PR or merging one. This section holds what differs in this repo.

- **Cards:** tool ClickUp, list Cards (`75390192`), ID prefix `PT-`, card link
  `https://app.clickup.com/t/3887534/PT-XXXX`.
- **Statuses:** not started `backlog`, `next up`, `discovery`, `pause`, `hotseat`; started `in progress`; after a PR
  review, changes requested `needs changes` and approved `approved`. Any other status: ask first.
- **Card automation:** none. Card status stays where `start-card` left it, a PR review sets the changes-requested or
  approved status above by hand, and the skills ask before any other move.
- **Card fields:** none.
- **Branches:** default branch `next`; naming `docs/<card id>/<kebab-description>` (for example
  `docs/pt-4039/validate-space-definition-checks`). Never commit to `main` or `next`.
- **PR:** title `[PT-1234] Title`; description the card link, plus what changed when it is not obvious from the diff,
  and the smplr.js PR it ships with when there is one.
- **Pre-PR:** `yarn build` (runs the Docusaurus build and the dead-link check). Skip only for a change that touches
  nothing but `CLAUDE.md` and `.github/`.
- **Pre-merge:** none. The Cloudflare Pages check builds the site, and `merge-pr` already stops on a failing one.
- **Merge:** a person always merges, never Claude on its own: Thibaut. A PR that documents smplr.js behaviour merges
  only once the code PR it describes is released. `/smplr:merge-pr` runs only when Thibaut asks for it in the
  session. Bypass (`--admin`): Thibaut only, and only after he says yes for that PR.
- **Release note:** none.
- **After merge:** none.
- **Backlog:** lists to scan: Cards (`75390192`, open statuses `backlog`, `next up`, `discovery`, `pause`, `hotseat`,
  `in progress`, `needs changes`, `reworking`, `needs review`, `approved`); done statuses `dev`, `prod`,
  `cancelled`, `broadcasted`; epic field `345eed83-7d67-4f47-a408-a2348afc9dfa`. No chat channels or spaces.
- **Session:** none.
- **Plan docs:** none.
