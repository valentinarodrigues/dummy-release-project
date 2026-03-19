# dummy-release-project

A dummy Node.js project demonstrating a fully automated GitHub release cycle — from pull request to production.

## How it works

Every change flows through the same pipeline:

```
open PR → CI passes → merge → staging deploy + Release Please PR
                                       ↓
                            merge Release Please PR
                                       ↓
                      release published → prod deploy + notify
```

## Automations

| Automation | Trigger | File |
|---|---|---|
| Lint & test (Node 18 + 20) | Every PR and push | `.github/workflows/ci.yml` |
| Auto-label by changed files | PR opened/updated | `.github/workflows/label-prs.yml` |
| PR size label (XS → XL) | PR opened/updated | `.github/workflows/label-prs.yml` |
| Deploy to staging | Merge to `main` | `.github/workflows/deploy-staging.yml` |
| Release PR + changelog + version bump | Merge to `main` | `.github/workflows/release-please.yml` |
| Deploy to production | Release created | `.github/workflows/deploy-prod.yml` |
| Release notification (Slack + job summary) | Release created | `.github/workflows/notify-release.yml` |
| Mark stale issues and PRs | Daily at 9am UTC | `.github/workflows/stale.yml` |
| Dependency updates (npm + Actions) | Weekly on Mondays | `.github/dependabot.yml` |
| Auto-assign reviewers | PR opened | `.github/CODEOWNERS` |

## Release flow in detail

This project uses [Release Please](https://github.com/googleapis/release-please) for fully automated versioning and changelog generation.

1. Merge one or more conventional commits to `main`
2. Release Please opens a **release PR** that bumps the version in `package.json` and updates `CHANGELOG.md`
3. When you're ready to release, merge the release PR
4. Release Please publishes a GitHub Release, then automatically triggers the production deploy and release notification

> **Note:** Because releases are created by `GITHUB_TOKEN`, GitHub blocks them from re-triggering `on: release` workflows in other files (a security measure). The fix used here is to call `deploy-prod` and `notify-release` directly from `release-please.yml` using `workflow_call`.

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Release Please reads commit messages to decide what version to bump.

| Prefix | Example | Version bump |
|---|---|---|
| `feat:` | `feat: add search endpoint` | minor (`0.1.0` → `0.2.0`) |
| `fix:` | `fix: handle null response` | patch (`0.2.0` → `0.2.1`) |
| `feat!:` or `BREAKING CHANGE:` | `feat!: remove v1 API` | major (`0.2.1` → `1.0.0`) |
| `chore:`, `docs:`, `ci:`, `test:` | `chore: update deps` | no bump |

## Setup checklist for a real project

- [ ] **Branch protection** — go to Settings → Branches → add rule for `main`: require CI to pass, require 1 review
- [ ] **Environments** — go to Settings → Environments: create `staging` and `production`, add a required reviewer gate on `production`
- [ ] **Slack notifications** — add `SLACK_WEBHOOK_URL` secret and set repo variable `NOTIFY_SLACK=true`
- [ ] **Replace deploy steps** — swap the `echo` placeholders in `deploy-staging.yml` and `deploy-prod.yml` with your actual deploy command
- [ ] **Labels** — ensure these labels exist: `area: source`, `area: tests`, `area: ci`, `area: docs`, `area: config`, `XS`, `S`, `M`, `L`, `XL`, `stale`, `dependencies`

## Local development

```bash
npm install
npm test          # run tests
npm run lint      # run ESLint
npm run test:coverage  # tests with coverage report
```

## Project structure

```
.
├── src/
│   └── index.js                     # Application code
├── tests/
│   └── index.test.js                # Jest tests
├── .github/
│   ├── CODEOWNERS                   # Auto-assign reviewers
│   ├── dependabot.yml               # Automated dependency updates
│   ├── labeler.yml                  # File-path → label mapping
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-prod.yml
│       ├── deploy-staging.yml
│       ├── label-prs.yml
│       ├── notify-release.yml
│       ├── release-please.yml
│       └── stale.yml
├── release-please-config.json       # Release Please settings
└── .release-please-manifest.json    # Tracks current version per package
```
