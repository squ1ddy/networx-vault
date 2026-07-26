---
title: The canvas — how it works
type: reference
status: living
last_updated: 2026-07-24
tags: [usage, canvas]
---

# The canvas

The canvas is the **spatial thinking layer**: a place to lay records out, see how they relate, and draw the links you intuit. It is a *derived view* over records, not a separate store — nothing on it is a new source of truth.

## Nodes embed record files — never forks

A record node points at a record's markdown file (`"type": "file"`), so it shows the live content and stays in sync as you edit the record. **Never paste a record's text into a node** — that forks it, and the fork rots. Text nodes are only for canvas-native furniture: headers, section labels, sticky annotations that don't belong in any record.

In the example canvas each track's `SYNTHESIS.md` is a file node, with a small text node above it as its header.

## Organise topic-first, group by type visually

Mirror how the vault is stored: **one canvas per topic** (or per active line of thought), and inside it use position and grouping to show *type* and *cluster* — Research over here, Concepts over there — rather than inventing type-folders. The layout is where the type grouping lives; the files themselves stay flat under `topics/` (ADR-0004). Colour and header nodes are free to use as visual scaffolding.

## Joining unrelated ideas — draw the edge when it's earned

This is the point of the surface. Pull two nodes from different corners (even different topics — one vault, so links cross freely) next to each other, and when you can name *why* they connect, **draw the edge and label it**. The edge label is the earned insight ("Track 01" / "Cross-cutting deliverable" in the example). Don't wire everything to everything; an edge means something. If you can't name the link yet, just park the nodes near each other and let it sit.

## Agent proposals are additive-only

Agents may add to a canvas, never rearrange it. The rules (ADR-0004, additive-only):

- **New nodes go only into the `⊕ Proposals` group.** Nothing an agent adds appears in your layout.
- **Agents never edit, move, recolour, or delete a human node or edge.** You add is one thing; the agent adds is strictly separate.
- **You curate.** Review what's in `⊕ Proposals`, then drag the keepers into your layout and wire them yourself. Ignoring a proposal is a valid answer — the group is a staging tray, not a queue you must clear.

The example canvas already carries an empty `⊕ Proposals` group in the top-right, ready to receive.

## Laying out the canvas

Today the canvas is a **native Obsidian surface you drive by hand** — add and arrange nodes, draw and label edges yourself. Dedicated node-scoped agent actions ("canvas this", "expand this node", "pull related sources") are on the framework roadmap, not yet built — see `docs/roadmap/vault-vision.md`. When they land they will stay strictly additive-only into `⊕ Proposals`.
