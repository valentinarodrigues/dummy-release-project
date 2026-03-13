# dummy-release-project

A dummy Node.js project demonstrating a fully automated GitHub release cycle.

## Automations included

| Automation | Trigger | Workflow |
|---|---|---|
| CI (lint + test) | Every PR / push | `ci.yml` |
| Auto-label PRs | PR opened/updated | `label-prs.yml` |
| Release Please (version bump + changelog) | Merge to `main` | `release-please.yml` |
| Deploy to staging | Merge to `main` | `deploy-staging.yml` |
| Deploy to production | Release published | `deploy-prod.yml` |
| Release notification | Release published | `notify-release.yml` |
| Mark stale issues/PRs | Daily schedule | `stale.yml` |
| Dependency updates | Weekly schedule | `dependabot.yml` |

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

- `feat: ...` → minor version bump
- `fix: ...` → patch version bump
- `feat!: ...` or `BREAKING CHANGE:` → major version bump
- `chore:`, `docs:`, `ci:` → no version bump

## Local development

```bash
npm install
npm test
npm run lint
```
