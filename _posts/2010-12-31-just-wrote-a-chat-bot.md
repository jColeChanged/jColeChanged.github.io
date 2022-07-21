---
layout: post
title: Just Wrote A Chat Bot
published: true
---

Two weeks ago my uncle came out from South Carolina to visit us for Christmas.
He brought along a laptop which had a license on it which allowed him to run
chat bots on Camfrog, Camfrog is a video conferencing platform geared
around chat rooms. He wanted me to create a bot for the program and I was
happy to do so.

At first we tried to find a way to copy the dll of an existing bot, because
it already did something really close to what we needed. This didn&rsquo;t
work, as the bot&rsquo;s architecture didn&rsquo;t allow it to have two
separate questions files. So I was forced to put on the programming belt and
hammer out some code.

This wasn&rsquo;t as fun as you might think. Rather than playing around with my
new favorite language, Clojure, I had to write an event based C++ dll. This
wasn&rsquo;t by choice. The good people at Camfrog have a closed source C++ bot
that loads and sends events to the dll. This lets them hide the
platform&rsquo;s protocol, which in turn allows them to charge a licensing fee
for using a bot. Don&rsquo;t want to buy the their bot hosting program? Good
luck making a bot.

Despite this disadvantage I forged ahead, spending the entire week and entirely
too much time making my uncle his bot. By the end of the week I had code in
place that kept track of user scores, asked questions with a time limit, and a
bit more. My uncle was satisfied.

I wasn&rsquo;t. Despite the project being far harder than the hardest program I
had been asked to write in the Introduction to C++ course I took last year, I
felt I could do better. The program I had just made was currently a copy of the
dll I had tried to work with at the beginning of this story, but that dll
failed me. It wasn&rsquo;t set up to allow its use in multiple games. It should
have been.

So I set about making my bot configurable. After a while the bot wasn&rsquo;t
some game. It was a platform on which you could host as many question and
answer games as you would like. All that you would need was a file to put
settings and a file with your questions. I went from an instance of a question
and answer game to question and answer game class. Now I was satisfied.

When I finished the bot, the week was over and my uncle left for home. When I
woke up in the morning my uncle&rsquo;s laptop was gone and a question had been
left in its place. How would my untested code fare in the wild? Thinking about
it helps me to understand why it is that developers love web apps so much. It
will be such a pain to push out updates if this bot doesn&rsquo;t work.
