---
layout: post
title: Sorting A Million Integers With Memory Constraints
published: true
---

*Edited in 2015.*

I want to have a skill set that allows me to work on machine learning problems, so solving an algorithm challenge with memory constraints appealed to me. One of my goals in writing this was to learn by being forced to dig deeper since I knew I would be publishing what I did.

That backfired. 

Have you ever heard of not invented here syndrome? I think I fell prey to something similar when I first wrote this.

I had been reading the textbook Introduction to Algorithms. Naturally, being a CS textbook, it is filled with sorting algorithms. Insertion, bubble, merge, quick, heap, counting, and bucket just to name a few. Somehow, shortly after reading about heaps, I ended up searching about sorting in Python.

This led me to the problem this blog post was originally about: How does one go about sorting a million 32-bit integers in 2MB of RAM? It also led me to a solution to the problem. Guido van Rossum, creator of Python, had went over how he would solve it using the `tempfile`, `array`, and `heapq` modules as well as liberal use of generators.

After reading his solution, I decided to try solving it myself. Like Guido I started off by using arrays and tempfiles. Then more and more looked similar. His approach came naturally, especially since I had just read it. Not realizing a list all at once by using a generator? Makes sense. Only loading so much into memory by shoving off into tempfiles? Makes sense.

I shouldn't have felt bad about that. I could have done worse than to learn to solve a problem in the same way the Guido did. Actually, I did do worse.

I had my priorities mixed up. I confused learning programming with learning writing.

Plagiarism. Not publishing at all. Both would have been better options than letting my desire to write influence what I did.

Instead of just learning from Guido's solution to the problem, I decided to write my own merging algorithm based off merge sort. Which seems like a pretty stupid idea, since even then I had known merge sort by heart for years. It led to ugly code. Merge sort constantly peeks at the start of two lists, but I was using generators so there was some extra book keeping involved with a peek. When I first wrote this that was what bothered me the most.

Now? A year later?

It occurs to me that I never learned much about `heapq`.

Anyway, here is the code I wrote in a gist:

<script src="https://gist.github.com/jColeChanged/06cecc001d3004a3c45a.js"></script>