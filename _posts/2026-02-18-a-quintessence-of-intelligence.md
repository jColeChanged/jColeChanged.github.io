---
layout: post
title: "A Quintessence of Intelligence"
description: "Entropy as the expected question-depth in the race from uncertainty to certainty."
tags: [entropy, information-theory, learning]
---

A quintessence of intelligence is that winners are first. So we begin, firstly, with first. The equation for [entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)) is typically presented as:

$$
H(X) = - \sum_{i=1}^{n} p(x_i) \log_{2} p(x_i)
$$

<div class="callout callout-note">
  <span class="callout-title">Note</span>
  <p>There is a meta-level point in the fact smart people chose to present the equation for entropy in this manner, because in a certain sense, this isn't what entropy is. Rather, it is an efficient way to calculate it.</p>
</div>

It can help to transform back to what it really is, beneath the performance optimization. Entropy is a weighted sum: each possible outcome contributes its probability, $p(x_i)$, times its information content, $-\log_{2} p(x_i)$.

Which means entropy is actually an expected value calculation.

$$
\mathbb{E}_{X}\!\left[ -\log_{2} p(X) \right]
$$

Here we're calculating the expected information content. In literal terms the expected information content is the negative base two logarithm of the likelihood that an event $x_i$ occurred.

To make that expectation tangible, imagine a skewed four-outcome world shown below. Outcomes that were unlikely deliver more bits, and because those bits are weighted by their probabilities, the pastel bars in the chart are exactly the contributions that add up to entropy.

<figure class="viz-card">
  <img src="/img/entropy-information-bars.svg" alt="Bar charts showing probabilities next to information content and their weighted contributions" loading="lazy" />
  <figcaption class="viz-caption">Entropy is a weighted average: the expected contribution $p(x_i)\cdot(-\log_2 p(x_i))$ from each outcome.</figcaption>
</figure>

But really, what does that even mean? The key insight is simple. Data and information are different things. Information is data with respect to an interpreter.

A story can help to understand the ideas.

Suppose Alice and Bobby are playing a guessing game with a deck of cards. The rule of the game is that Bobby gets to take one card at random from the deck. Then Alice has to ask Bobby yes or no questions in order to figure out which card he took. Meanwhile, Bobby must only ever answer with a yes or a no.

Now, Bobby happens to pick out the Ace of Diamonds. Alice doesn't know that. From her perspective, it could be anything. So she asks a question, "Is your card a club or a spade?"

"No," Bobby responds.

Now Alice knows that it must be either a Diamond or a Heart, but she still isn't very certain what the rank of the card is. So she asks another question, "Is it a Heart?"

"No," Bobby answers.

Now Alice knows that it must be a Diamond, but she still doesn't know what the rank is. Still, her guesses have been quite good. She has been eliminating half of the options with every question she asks.

It is possible to do worse than that. Alice could ask whether Bobby had breakfast. That wouldn't tell her anything about the card. The point is that not all questions are equal -- some eliminate half the remaining possibilities, others eliminate none.

There are nine numbered cards (2 through 10), plus the Ace and three face cards, for a total of thirteen unique ranks. So Alice would learn a lot more if she asked whether the card was above seven or a face card, since that would eliminate another half of the cards that Bobby could potentially have.

Programmers will notice what’s happening: this is essentially a **binary search** over a set of possibilities. At each step, you divide the space roughly in half, until only one element remains.

Entropy is the **average number of such halving steps required**: the expected depth of the binary search tree when the elements are not equally likely, but weighted by their true probabilities.

If Alice was asking the best possible questions, then on average she would end up asking $\log_{2}52 \approx 5.7$ questions. So an intuitive way to think about entropy is that it is the expectation of how many questions we would need to ask if we were really good at asking questions.

For this reason many people will frame entropy as a measure of uncertainty. It is kind of like the minimum distance you would need to cross in order to figure out where you are given you were not certain where you were if you were very intelligent.

But that wasn't what led to it being discovered: it was discovered in the process of determining the properties of an ideal engine.

Which brings us back to the idea of a race. A quintessence of intelligence is that winners are first. In a race, what does it mean to be first? It means to cross the distance before others do. There is a path length in doing so.

Entropy is the average shortest path length. It is the number of questions you ask if you ask the right questions.

**Entropy.**

The foundation upon which the field of information theory rests, which in turn is the foundation upon which statistical learning theory rests, is actually about winning a sort of race. Each question is a stride forward. Entropy is the distance to victory measured in questions. To be intelligent is to run the shortest race possible.

A race from uncertainty, to certainty. A race from not knowing, to knowing. So more fundamental than probability theory, more fundamental than logic, more fundamental than learning, is a simple thing. The quintessence of intelligence is this: In order to win a race? We must be first.
