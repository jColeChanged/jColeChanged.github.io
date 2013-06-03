---
layout: post
title: Student, It Isolates Variables
published: true
---
Slowly, but surely, I've been working my way through Paradigms of Artificial Intelligence Programming (PAIP). I just finished reading up on an AI program named Student. It is a clever little bit of code that can solve word problems that wouldn't be out of place in a high-school algebra class.

Though, I'm not really sure that clever is the best way to describe the code. Really, when it gets down to it, the magic in Student is the same as the magic in Eliza. They both use extremely basic pattern matching: a regex like pattern with capture capabilities and a matching bit of data that the captured input will be transplanted into.

There are a few differences between the two programs. For example, the pattern matching code of Eliza is ready to quit after finding its first match, but Student recursively matches every part of its input. If you give it a paragraph it will keep on breaking the input up until it has a series of equations which model the problem that was given.

Like Eliza, the short fall of the program is pretty obvious. If you give it a bit of math that doesn't fit into the patterns that were supplied for it, it won't behave properly. Yet it is still pretty cool when it does behave properly. It doesn't just spit out a response once it finishes parsing its input. Instead it proceeds to solve the equations it was given.

This turns out to be much simpler than one might expect. If you think about it, the root of most equations in which you are solving for one variable is isolating that one variable. You just keep moving things around using simple rules until the unknown is the only thing on one side of the equals sign. At that point things are solved. So once you type out exactly how to invert each of the mathematical operations that Student is likely to encounter, solving the equations becomes [trivial](http://books.google.com/books?id=7papZR4oVssC&pg=PA84&lpg=PA84&dq=trivial+feynman&source=bl&ots=esUV9cqQ_W&sig=HAJwHxBqT6vVxG9eH7O4YE7IzuM&hl=en&sa=X&ei=wCqsUeLCIOSL0QGn0oHQDg&ved=0CDwQ6AEwAg#v=onepage&q=trivial%20feynman&f=false).

