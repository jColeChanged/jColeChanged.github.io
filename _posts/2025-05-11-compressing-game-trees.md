---
layout: post
title: Compressing Game Trees
published: true
author: joshuacole
---

Game solving algorithms have to explore the graph which is implicit in a game's definition.  However, game graphs can end up growing quite large.  Each action is a branching point, leading to combinatoric growth.  That sort of growth is even faster than exponential growth.

I was working on a problem in this space recently and memory was growing larger than most people tend to encounter in day-to-day software engineering. Not large as in megabytes.  I'm talking large as in terabytes.

While exploring ways to reduce RAM usage, I ended up hitting on a good idea that reduced memory usage by 90%.  I've read research papers related to game theoretic solving, but I haven't seen anyone mention this particular optimization.  So I'm sharing it.  Maybe it will help others.

The basic idea is that instead of storing paths through the graph we can store compressed paths through the graph.  Once I point it out in these terms: if memory usage is an issue, consider compression as a solution, the idea of compressing the action sequence paths seems somewhat obvious.

There are a lot of ways to do graph path compression, but the way I did it was by training a huffman encoder and bit packing [1].  Huffman encoding has a proof associated with it: for memoryless compression, where each symbol is assumed to be independent of previous ones, it guarantees the average bit length of compressed messages is as low as it can be.


[1]: This is probably why the path compression technique I'm using wasn't mentioned.  With so many different ways to compress a sequence, people choose a different method.  My technique is just interesting in that it can be applied after the fact on top of existing methods of abstracting a game tree, which is where most of the research is focused.