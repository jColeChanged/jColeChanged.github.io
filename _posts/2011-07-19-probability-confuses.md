---
layout: post
title: Probability Confuses
published: true
---

Most of the people who read this blog have already discovered that I'm
interested in both probability and statistics. What they might not guess is
that this passion of mine leads to minor conflict with my family. Not serious
conflict. I'm not talking about anger, raised voices, and strained
relationships. I'm talking about the sort of conflicts which always seem to be
sprouting up when probability is under discussion.

It took a long time before humanity got a grip on modeling probabilities. The
first formal treatment of the subject I'm aware of were the [letters][1]
between [Blaise Pascal][3] and [Pierre de Fermat][4]. Reading them was
interesting. Each of these letters was exceedingly polite so much so that a
modern reader use to discourse on the internet and the counsel that they ought
to always be concise might think the polite wordings were some sort of joke.

In these letters which [changed the way people see the world][2] the two intellectual
giants were trying to figure out the correct way to solve the
[divide the pot of an unfinished game][5], but they did not agree about how to
do it. Even from the start probability problems were showing themselves to be
confusing to the brightest. Hundreds of years later probability still confuses
us.

In 1975 [Marilyn vos Savant][6] who was in the record books for having the
worlds highest IQ, published what it is now known as the
[Monty Hall problem][7]:

> Suppose you're on a game show, and you're given the choice of three doors:
> Behind one door is a car; behind the others, goats. You pick a door, say No.
> 1, and the host, who knows what's behind the doors, opens another door, say
> No. 3, which has a goat. He then says to you, “Do you want to pick door No.
> 2?” Is it to your advantage to switch your choice?

Savant claimed that the best thing to do in this situation would be to switch
doors. She correctly reasoned that by switching doors you would give yourself
a 2/3 chance of having the right door, but that by staying with the door you
had chosen you would have only have a 1/3 chance at having selected the correct
door. Many people disagreed with her. Not just people who knew nothing about
probability, even [PHD's were telling her][8] she had gotten the wrong answer.
The Monty Hall problem is famous for having sparked so much disagreement. It is
taught about in statistics courses across the country. The
[problem has even been covered in the movie 21][9].

This is the sort of debate I'm talking about. Debates about non-intuitive
probability problems.

I once gave the problem to my family. When I shared with them the correct
answer they refused to accept it. We argued over it for hours before I managed
to convince them that I was right. The thing is, there are more disagreements
than just this one. People get probability wrong *all the time*; This is just a
famous example.

Sports fans believe that hot streaks are a real thing. They might be angry
with a coach for not putting the game in the hands of a hot player. Studies
don't agree with them. They have looked at the [so-called streaks][10] in
sports. It turns out that there is no such thing. What we see as a streak is
actually just chance. We get confused about streaks outside of sports
too. Peter Norvig wrote about our inability to spot true randomness in an
article about [proper experimental design][11].

There is also a study in which doctors were asked to determine
how likely a patient was to have cancer. They were given all the numbers they
would need to come to the right answer, but almost all of them didn't. Most of
the doctors claimed that the patients were likely to have cancer. In
truth, there chance of having cancer wasn't high. The doctors got
the answer wrong by an order of magnitude despite their education.

The list of ways humans make mistakes when thinking and working with
probability is long. We are able to calculate probabilities, but we don't find
it intuitive.

I did a probability problem which I found in the back of
[Introduction To Algorithms][12]. Here is the problem:

> A deck of 10 cards, each bearing a distinct number from 1 to 10, is shuffled
> to mix the cards thoroughly. Three cards are removed one at a time from the
> deck. What is the probability that the three cards are selected in sorted
> (increasing) order?

I decided that the answer to the problem was that 1/6 of the time the cards
would be drawn in ascending order. After all, for each set
of three cards there are six different orders in which they can be drawn, but
only one of these orderings will be sorted properly. When I shared this answer
with my dad, he rejected it immediately. Minutes later I found myself with ten
cards in my hand running through things manually and trying to prove to him
that my answer was the right one. We went through twenty deals without ever
having seen the cards dealt in ascending order and suddenly my father was
sure: I was wrong, and he was right.

A thousand draws tell a different story:

```clojure
;; A deck of ten cards each bearing a distinct number
;; between one and ten are shuffled in order to mix the
;; cards thoroughly. Three cards are removed from the
;; deck one at a time. What is the probability that the
;; three cards are selected in sorted order?

;; First lets create the deck…
(def cards (range 1 11)) ;; > [1 2 3 … 9 10]

;; Next we draw cards from a shuffled deck by
;; using shuffle and take
(defn draw-cards [] (take 3 (shuffle cards)))

;; Testing this function in the REPL we get…
;; user> (draw-cards)
;; (2 7 8)
;; user> (draw-cards)
;; (9 8 4)

;; Now we need a way to tell whether or not the cards
;; are in sorted order. We can use a comparison
;; operator to do that pretty simply
(defn ascending? [draws] (apply < draws))

;; Now lets say we try drawing a few thousands time…
;; How frequently will the cards be in ascending order?

;; user> (count (filter ascending? (repeatedly 6000 draw-cards)))
;; 1027
```

[1]: https://www.york.ac.uk/depts/maths/histstat/pascal.pdf
[2]: https://www.youtube.com/watch?v=3pRM4v0O29o#t=5m00s
[3]: https://en.wikipedia.org/wiki/Blaise_Pascal
[4]: https://en.wikipedia.org/wiki/Pierre_de_Fermat
[5]: https://en.wikipedia.org/wiki/Problem_of_points
[6]: https://en.wikipedia.org/wiki/Marilyn_vos_Savant
[7]: https://en.wikipedia.org/wiki/Monty_Hall_problem
[8]: https://www.nytimes.com/1991/07/21/us/behind-monty-hall-s-doors-puzzle-debate-and-answer.html?src=pm
[9]: https://www.youtube.com/watch?v=Zr_xWfThjJ0
[10]: http://wexler.free.fr/library/files/gilovich%20(1985)%20the%20hot%20hand%20in%20basketball.%20on%20the%20misperception%20of%20random%20sequences.pdf
[11]: https://norvig.com/experiment-design.html
[12]: https://en.wikipedia.org/wiki/Introduction_to_Algorithms
