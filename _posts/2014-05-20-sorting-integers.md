---
layout: post
title: Sorting A Million Integers With Memory Constraints
published: true
---
I've been reading the textbook Introduction to Algorithms. It's a famous book widely known as CLRS because it had four authors: Cormen, Leiserson, Rivest, and Stein. Hopefully the acronym is obvious.

In the book I've been encountering a whole slew of search algorithms. Apparently searching is dearly loved by computer science. While reading the text I've encountered insertion, bubble, merge, quick, heap, counting, and bucket sort just to name a few. At some point I ended up using Google to search around for information about sorting in Python. It was then that I encountered an interesting problem: How does one go about sorting a million 32-bit integers in 2MB of RAM in Python?

A similar question was asked to President Obama by Google's CEO Eric Schmidt, but the person I found who was tackling the problem was none other than the creator of Python himself, Guido van Rossum. He solved the problem by using the tempfile, array, and heapq libraries.

I decided I was going to try tackling the same problem. I'm actually interested in dealing with large datasets so it seemed like the sort of thing I should understand how to do. Like guido I started off by using arrays and tempfiles. Our solutions did end up differing though. I decided to write my own merging algorithm based off merge sort instead of using heapq.

I learned that using generators can get pretty hairy. Generators have the property that once you look at something its gone. This ended up being annoying, because I was dealing with two generators at once and I needed to make decisions based on the contents of the first item in the generator while looping. It led to some really ugly looking code.

Anyway, here is the code I wrote in a gist:

<script src="https://gist.github.com/jColeChanged/06cecc001d3004a3c45a.js"></script>