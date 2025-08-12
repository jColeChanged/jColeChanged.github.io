---
layout: post
title: "Abstraction in Game Graphs: A Primer for Graph Theorists"
description: "Bridging game-graph abstraction with familiar graph-coloring ideas, with practical notes for large, partially known graphs."
tags: [game-theory, graph-theory, abstraction]
---

This short note bridges a standard abstraction technique from game theory with graph-coloring language that may feel familiar if you come from graph theory or algorithms.

The goal: compress a game’s state space without losing the strategic information needed to reason and learn. When the graph is huge (which it often is), we also sketch how to approximate this abstraction in a controlled way and how to start learning before the full graph is known.

### Abstraction in graph language

Consider a directed acyclic “game graph” of states and actions: let `G = (V, E)` be a directed acyclic graph. Terminal nodes `T ⊂ V` carry outcome labels (for example, a function `λ` that maps terminals to Win/Loss/Draw). Each non-terminal state `v` has outgoing edges to its children `u₁, …, uₖ`.

In learning terms, we often care about per-state action information (e.g., regrets or policy weights over outgoing edges). The trouble is combinatorial growth: the number of distinct states explodes. We therefore want a **compression** that groups states which are strategically equivalent.

A clean way to do this is via a coloring function `C(v)` defined by a simple rule:

1. Base step (terminals): color each terminal by its outcome label (e.g., `W`, `L`, `D`).
2. Inductive step (non-terminals): color a state `v` by the **multiset of its children’s colors**. Intuitively, if two states lead to the same multiset of colored futures, we color them the same.

Propagate this rule backward until colors no longer change. States that end with the same color are strategically equivalent. This gives a **lossless compression** of the game graph with respect to the information this coloring captures.

> Note (intuition): In tic‑tac‑toe, rotating the board doesn’t change the game. Different states that are just rotations of one another end up with the same colored “future,” so they share a color. The coloring captures equivalence due to symmetries and identical downstream structure.

In practice, even lossless colorings can still be too large to compute exactly on real games.

### Making it tractable: controlled merging (clustering)

When the exact coloring still yields too many distinct colors, we can trade a little precision for tractability by **clustering colors** based on how they transition. Concretely, we estimate color→color transition frequencies and cluster similar colors together. This reduces the number of colors while preserving most of the strategic signal.

Crucially, this can be done with quantitative controls so we can talk about how close the clustered abstraction is to the exact (lossless) one and, in turn, how learning quality is affected.

### Extending to unknown graphs

One kind of interesting thing, to me at least, is trying to extend the idea to games we don't really know yet.  Real life tends to be only partially explored.  Interestingly, The same ideas work if we allow an explicit "unexplored" marker in the transition counts: we can begin learning immediately and refine the abstraction as new parts of the graph are discovered. 

I've been calling this **online abstraction** (abstraction as you go) to distinguish it from a full, step‑by‑step offline pass on a known graph.  It can be paired with learning as you.  The result is an algorithm that has some nice properties with respect to quality of solution at any particular stopping time.

### Why this matters

- It connects naturally to familiar graph concepts (multiset color refinement / partition refinement) while grounding the choice of equivalence in strategic behavior.
- It provides a pragmatic path: start with lossless refinement where possible, then cluster with quantitative safeguards when the graph is too large.
- It supports real‑world learning where the graph is discovered over time.

If you’re working on related problems or have feedback, feel free to reach out: joshua@tacktech.ai.

