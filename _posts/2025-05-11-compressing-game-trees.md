---
layout: post
title: Compressing Game Trees
published: true
author: joshuacole
---

Something is complex when it consists of many different and connected parts.  So complexity is a great word for describing the central challenge faced by game solving algorithms.  Game graphs branch with each action and then branch again with the next, growing combinatorially, a growth rate which outpaces even exponential growth.  To make progress, we need clever ways to manage this complexity.

I cover in another post on [graph abstraction](/2025/08/08/abstraction-in-game-graphs-a-primer.html) how to take a game graph which is complex and reduce it to an equivalent or near equivalent graph which is less complex.  However, even with this technique we're still left with a staggering amount of complexity.  How can we make things more tractable?

One way we can do that is by operating with respect to a zipper over a lazily materialized game graph.  By doing that we don't have to pay the cost of holding the entire graph in memory.  We only need to hold the zipper in memory.

But this brings us to a challenge that I've never heard anyone talk about but which turns out to be practically important.  The keys in your zipper actually matter, because the path information they contain takes up space.  How can we compress the zipper path?

## Information Theory

Some actions in a game tree are more common than others. For example, a `call` might happen far more frequently than a `5-bet`.  The most natural way to think of the zipper path is to think in terms of the actions in the game, since that is what materialized the game graph.

However, if we think about it, there is a better representation.

Claude Shannon, in his foundational work on information theory, proposed that the amount of information or "surprisal" in an event is inversely related to its probability. A rare event is more surprising, and thus contains more information.

```clojure
(defn information-content
  "Information content (self-information) of an event with probability p: -log2(p)."
  [p]
  (- (log2 p)))

(defn pointwise-information-content
  "Returns the vector of pointwise self-information values for a probability distribution q."
  [q]
  (mapv information-content q))

(defn entropy
  "Shannon entropy of a probability distribution p (vector of strictly positive probabilities)."
  [p]
  (expected-value (pointwise-information-content p) p))
```

An event with a 50% chance (`p=0.5`) has 1 bit of information content. An event with a 12.5% chance (`p=0.125`) has 3 bits.

If we know the probabilities of all possible actions at a given point, we can calculate the *average* information content for that distribution. This average is called **Shannon Entropy**.  Entropy tells us the fundamental level of uncertainty or unpredictability for a set of events.

## From Entropy to Efficient Representation

So what does entropy have to do with compressing our game tree paths? Entropy gives us a hard limit. It tells us the average number of bits we need, at a minimum, to represent each action in a path. This is the theoretical floor for any lossless compression that operates without memory.  No scheme can do better.

But why is this a hard limit? Consider that each bit in your output can only resolve one point of uncertainty: a single yes/no question. To distinguish between all possible sequences of actions, you need to ask enough "questions" on average to identify any given sequence uniquely. Frequent actions contribute less uncertainty, so they require fewer bits to identify. Rare actions contribute more and require more bits. Entropy gives us the precise mathematical average of this uncertainty per action. If you use fewer bits than the entropy, you are fundamentally not capturing enough information to distinguish between all possible sequences, and your compression can no longer be lossless.  If you use more, you're asking more questions than were necessary.

This gives us a clear goal: find a way to encode actions such that the average length of the encoded actions is as close to the entropy as possible. This is where our choice of representation becomes critical.

### Huffman Coding: An Optimal Choice

One of the most elegant ways to approach this limit is with Huffman coding. The algorithm constructs an optimal **prefix code**, where no symbol's bit sequence is a prefix of another's. This clever property guarantees the shortest possible average code length.

The core idea is simple and brilliant: we build up a priority map of leaf frequencies and combine the least frequent branches until we've combined everything together and have a full tree.  Infrequent actions end up deep in the tree with long bit codes, while common actions stay near the root with short bit codes. This structure ensures that the average bit length is minimized.

Here is the code that builds the tree and the corresponding codebook:

```clojure
(defn frequencies->priority-map
  "Takes a sequence of [symbol frequency] pairs and returns a priority map of HuffmanNodes keyed
   by frequency."
  [freqs]
  (reduce
   (fn [pq [val freq]] (conj pq [(->HuffmanNode val nil nil) freq]))
   (p/priority-map)
   freqs))

(defn combine-priority-nodes
  "Combines two [HuffmanNode frequency] pairs into a new parent node with summed frequency."
  [[left-node left-freq] [right-node right-freq]]
  [(->HuffmanNode nil left-node right-node) (+ left-freq right-freq)])

(defn internal-node?
  "A node that has been processed."
  [n]
  (and (nil? (:value n)) (or (:left n) (:right n))))

(defn merge-huffman-queue
  "Consumes a priority map of HuffmanNodes and repeatedly combines the two least frequent nodes
   until a single merged tree remains."
  [queue]
  (assert (pos? (count queue)) "Queue must contain at least one node")
  (if (== (count queue) 1)
    ;; Prevent degenerate roots in cases where there is only one symbol in the training data.
    (let [[node freq] (first queue)]
      (if (internal-node? node)
        queue
        (conj (p/priority-map) [(->HuffmanNode nil nil node) freq])))
    (recur
     (conj
      (rest (rest queue))
      (combine-priority-nodes (first queue) (first (rest queue)))))))

(defn make-huffman-tree
  "Constructs a Huffman tree from a collection of symbols."
  [coll]
  (-> coll frequencies frequencies->priority-map merge-huffman-queue first first))

(defn make-huffman-codebook
  "Derives a symbol->bitstring map from a tree."
  ([tree] (make-huffman-codebook tree []))
  ([{:keys [value left right]} path]
   (cond
     (nil? tree)     {}
     (some? value) {value path}
     :else         (merge
                    (make-huffman-codebook left (conj path 0))
                    (make-huffman-codebook right (conj path 1))))))
```

## Game Actions To Efficient Game Actions

Next we take the simple step of figuring out the frequencies over actions.  Then assign them the shortest code.  In combination with a technique like bitpacking to store things in a single computer-word I've seen this technique decrease memory usage by 90% on terabyte-sized game model datasets.
