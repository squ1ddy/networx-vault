# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this vault's issue tracker (backlog.md labels, applied with `-l`).

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

> **Scope:** triage applies only to issues you did *not* author (incoming reports / requests, e.g. from `/qa`). Self-authored tickets from `/to-tickets` skip triage. A fresh vault's backlog is typically all self-authored, so triage stays **dormant** until external issues arrive. See `workflow-alignment.md`.
