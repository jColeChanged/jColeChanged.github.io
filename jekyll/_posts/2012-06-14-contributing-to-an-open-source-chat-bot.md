---
layout: post
title: Contributing to an Open Source Chat Bot
published: true
---

My first ever contribution to an open source project that wasn&rsquo;t my
own was a plugin for an IRC chat bot in #clojure on freenode. The plugin was
called findfn, because that is what it did. When someone types something in
IRC along the lines of <code>findfn 2 2 4</code> it would return a list of all
the functions which would return <code>4</code> after being passed
<code>2</code> twice. In that example it would probably return the operators
for both addition and multiplication. Other times it might return first, last,
map, or any number of other functions.

To do this the plugin took a brute force approach. There weren&rsquo;t any
clever means of figuring out what would return what, though it would be
probably be possible to do that given functions with the right metadata.
Instead it went through all the functions in the core namespaces and
tested each of them to see if applying all but the last argument would return
a result which matched the last argument.

It wasn&rsquo;t long after that I submitted the plugin that I saw it being
rolled out in #clojure. Then only a little while after that I saw the plugin
being merged into the core of the bot. For a first time contribution to open
source I was pretty happy with the result. People actually found something I
had helped to build to be useful.

I&rsquo;m really glad that I had the chance to give back to the IRC
community in #clojure. For those of you who program in Clojure, but
haven&rsquo;t been there, you&rsquo;re really missing out. It is home to some
of the nicest and most helpful people I&rsquo;ve met online. I&rsquo;m pretty
sure that I ended up having more questions answered in the IRC chat and through
searching its logs then I did on [StackOverflow][1].

I know that I would never have submitted the plugin if it weren&rsquo;t for
wonderful people like amalloy and raynes. amalloy helped me fix a bug in the
initial impementation of the function and also guided me through submitting the
plugin to lazybot.

[1]: http://www.stackoverflow.com/
