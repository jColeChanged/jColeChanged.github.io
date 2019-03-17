---
layout: post
title: A Little Bit Irrational
published: true
---

My uncle Tim asked me to run a card game at the local bowling alley. People
bought into the game for one dollar and all of their money was then put into a
pot that goes to the winner of the game. If nobody won the pot would carry over
to the next week. The carry over would continue until someone did manage to
win. Winning was a little harder. In order to win you had to draw a specially
marked card from a deck of five-hundred cards.

When I did the math, I realized that getting into the card game didn't make
much sense. When I broke things down I found that there was roughly a 1%
chance of winning the game. I knew that I could use that information to
calculate the average amount which will be won.

```
average win = chance to Win * pot size
```

Of course, knowing how much I was expected to win isn't enough to know if 
the game is worth playing. I also factor in how much I had to pay to have a
chance at winning the money. The expected return on each game is actually our
chance to win multiplied by the pot size minus the amount we payed to get into
the game.

```
average return = win chance * pot - buy in
```

So what happens when we plug in our 1% chance to win, our $1 opportunity cost,
and graph the result?

![Average Returns][1]

Basically, unless the pot has more then a hundred dollars in it, we are going
in expecting to lose money. So since there is no guarantee that we will stay
in every week, it doesn't make sense to get into the game. Though I suppose
people could get non-monetary returns, like social opportunity, which might
overwhelm the trivial pot sizes.

[1]: /img/a-little-bit-irrational/average-return.png "Average Returns"
