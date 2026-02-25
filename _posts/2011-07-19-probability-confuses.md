---
layout: post
title: Probability Confuses
published: true
description: "From Pascal and Fermat to the Monty Hall problem: probability trips up even experts. A Clojure simulation confirms the math."
tags: [probability, clojure, mathematics]
---

When your intuition disagrees with the math on a probability problem, simulate. A few lines of code settles arguments that have stumped [PhDs][8], [doctors][11], and [sports fans][10] alike. The [Monty Hall problem][7] is the famous case: even people with the [highest recorded IQs][6] drew fire from credentialed experts for getting the right answer.

Probability problems have been confusing brilliant people since [Pascal and Fermat][1] first [disagreed][2] about how to [divide a pot][5]. The pattern repeats. Here is a problem from [Introduction to Algorithms][12]:

> A deck of 10 cards, each bearing a distinct number from 1 to 10, is shuffled
> to mix the cards thoroughly. Three cards are removed one at a time from the
> deck. What is the probability that the three cards are selected in sorted
> (increasing) order?

The answer is 1/6: for any set of three cards there are six possible orderings, and exactly one is sorted. But twenty manual deals might not show a single hit, which is enough to convince someone watching that 1/6 is wrong. Small samples are treacherous.

Six thousand draws tell a different story:

```clojure
;; A deck of ten cards each bearing a distinct number
;; between one and ten are shuffled in order to mix the
;; cards thoroughly. Three cards are removed from the
;; deck one at a time. What is the probability that the
;; three cards are selected in sorted order?

;; First let's create the deck…
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

;; Now let's say we try drawing a few thousand times…
;; How frequently will the cards be in ascending order?

(count (filter ascending? (repeatedly 6000 draw-cards)))
;; 1027
```

1027 out of 6000 is about 17% -- close enough to 1/6 that the math checks out. Simulation is the cheapest way to calibrate probabilistic intuition. Write the ten-line program before you argue.

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
