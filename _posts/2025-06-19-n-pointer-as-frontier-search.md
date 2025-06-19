---
layout: post
title: N-Pointer as Frontier Search
published: true
author: joshuacole
---

# Frontier Search for N-Pointer Problems

Many common [n‑pointer problems](https://leetcode.com/problem-list/two-pointers/) are actually **frontier search** problems in disguise.  In this post I’m going to remove that disguise and then show how the refactoring pushes the design into a space in which important properties become explicable.  There are many reasons this is worthwhile, but one that the article will touch on is that having explicable properties leads to more robust software by enabling [better testing strategies](https://joshuacol.es/2019/04/23/hypothesis.html) and promoting code reuse.

## Frontier Search Recap

In case you're not familiar with the idea of a frontier search, we're first going to introduce it.  The most important quality of a **frontier search** is the data structure used to implement the frontier.  Choosing different frontiers results in different search algorithms.  

Suppose this is our frontier protocol and our frontier-search algorithm:

```clojure
(defprotocol Frontier
  (add    [this x])   ;; enqueue
  (next   [this])     ;; returns an element and the updated frontier
                      ;; enabling functional purity.
  (empty? [this]))    ;; queue exhausted?

(defn frontier-search
  [frontier goal? neighbors initial]
  (letfn [(step [{:keys [frontier]}]
            (when-let [[s f] (next frontier)]
              {:state s
               :frontier (reduce add f (neighbors s))}))]
    (->> {:frontier (add frontier initial)}
         (iterate step)
         (map :state)
         (remove nil?)
         (filter goal?)
         first)))
```

Then we can get depth-first search as simply as:
```clojure
;; Vector → stack  (depth‑first)
(extend-type clojure.lang.PersistentVector
  Frontier
  (add    [v x] (conj v x))
  (next   [v]   (when (seq v) [(peek v) (pop v)]))
  (empty? [v]   (empty? v)))
  
(defn stack-frontier [] [])

(defn dfs 
  [goal? nbrs start] 
  (frontier-search (stack-frontier) goal? nbrs start))
```

Breadth-first search is simple too:
```clojure
;; PersistentQueue → queue (breadth‑first)
(extend-type clojure.lang.PersistentQueue
  Frontier
  (add    [q x] (conj q x))
  (next   [q]   (when (seq q) [(peek q) (pop q)]))
  (empty? [q]   (empty? q)))
  
(defn queue-frontier [] clojure.lang.PersistentQueue/EMPTY)

(defn bfs [goal? nbrs start]
  (frontier-search (queue-frontier) goal? nbrs start))
```

Even more complicated search strategies like [best first search](https://en.wikipedia.org/wiki/Best-first_search) and [beam search](https://en.wikipedia.org/wiki/Beam_search) are also straightforward.  Best first search tries to order what we search by using a heuristic function, *h* and beam search does the same thing, but it limits the size of the queue of options that can be considered, thereby reducing memory requirements.

```clojure
(require '[clojure.data.priority-map :refer [priority-map]])

(defrecord PriorityFrontier [pq score-fn width]
  Frontier
  (add [{:keys [pq score-fn width] :as f} s]
    (let [pq*  (assoc pq s (score-fn s))
          trim (fn [q] (let [[w _] (peek (rseq q))] (dissoc q w)))
          pq** (if (and width (> (count pq*) width)) (trim pq*) pq*)]
      (assoc f :pq pq**)))
  (next [{:keys [pq] :as f}]
    (when-let [[s _] (peek pq)] [s (assoc f :pq (pop pq))]))
  (empty? [{:keys [pq]}] (empty? pq)))

(defn priority-frontier
  ([score]     (priority-frontier score nil))
  ([score k]   (->PriorityFrontier (priority-map) score k)))

(defn best-first 
  [h goal? nbrs s]
  (frontier-search (priority-frontier h) goal? nbrs s))

(defn beam-search 
  [h goal? nbrs s k]
  (frontier-search (priority-frontier h k) goal? nbrs s))
```

## A Simple N-Pointer Problem: Two Sum

We’re given a **sorted** vector `nums` and a `target`. The task is to return _the_ two numbers whose sum equals `target`, and do so in _O(n)_ by exploiting the sort order:

- Pointers start at `left = 0`, `right = n‑1`.
- Need a bigger sum? Move the left pointer right.
- Need a smaller sum? Move the right pointer left.

When you write this directly in code you get something that looks like this:

```clojure
(defn two-sum [nums target]
  (loop [l 0, r (dec (count nums))]
    (when (< l r)
      (let [sum (+ (nums l) (nums r))]
        (cond
          (= sum target) [(nums l) (nums r)]
          (< sum target) (recur (inc l) r)
          :else          (recur l (dec r)))))))
```

This works fine, but notice that testing it can be tricky, because the conceptual pieces aren't pulled out: they hide inside the loop body. In theory we can prove termination (the window shrinks monotonically), yet we can’t test that property directly.

We can tease these ideas out to gain explicable properties:

- **Goal predicate**
- **Continuation/terminal condition**
- **Successor (move) rule**

```clojure 
(defn two-sum-goal?
  "True when the pointed-at pair sums to target."
  [nums target]
  (fn [[l r]] (= (+ (nums l) (nums r)) target)))

(defn two-sum-within-bounds? [l r] (< l r))

(defn two-sum-neighbors
  "Single-successor function. Monotone ⇒ ≤ n steps."
  [nums target]
  (fn [[l r]]
    (when (two-sum-within-bounds? l r)
      (let [sum (+ (nums l) (nums r))]
        (if (< sum target)
          [(inc l) r]                   
          [l (dec r)])))))
```

These helpers have nice algebraic properties that we can test.

```clojure
(require '[clojure.test.check.clojure-test :refer [defspec]]
         '[clojure.test.check.generators  :as     gen]
         '[clojure.test.check.properties  :as     prop])
         
(defspec neighbors-are-monotone 1000
  ;; Generate a sorted vector of ≥ 2 ints plus an arbitrary target.
  (prop/for-all [nums   (->> (gen/vector gen/int 2 100)
                             (gen/fmap #(->> % sort vec)))
                 target gen/int]
    (let [succ (two-sum-neighbors nums target)
          ;; Walk the successor chain starting at the extremes.
          path (take-while some? (iterate succ [0 (dec (count nums))]))]
      (and (apply <= (map first  path))   ; left index never decreases
           (apply >= (map second path)))))) ; right index never increases

```

Running 1000 random trials gives far stronger evidence of the invariant than a couple of hand-picked cases and you can learn more about why I advocate for this testing approach by reading [my article on stochastic property testing](https://joshuacol.es/2019/04/23/hypothesis.html).

Now clearly it happens all the time that we encounter instances of search problems.  Here though, because we've captured out the elements that compose into the search problem, we're able to reuse our existing frontier search infrastructure to solve the problem.

```clojure
(defn two-sum-frontier
  "Frontier‑search implementation of Two Sum."
  [nums target]
  (let [goal?     (two-sum-goal?     nums target)
        neighbors (two-sum-neighbors nums target)]
    (when-let [[l r]
               (frontier-search (stack-frontier)
                                 goal?
                                 neighbors
                                 [0 (dec (count nums))])]
      [(nums l) (nums r)])))
```

# Take-away

By recasting two sum as a frontier-search instance, we traded a bespoke loop for three reusable predicates: **goal**, **successor**, and **bounds**.  We've plugged them into a generic search engine. The payoff is twofold:

1. **Provability & Tests**. Monotonicity, termination, and other invariants become unit- or property-testable facts, not hand-wavy assertions.    
2. **Reuse & Extensibility**. Once those predicates exist we can solve the problem without new control logic.

When problems share this "advance-one-pointer-monotonically" shape, reaching for frontier search turns scattered ad-hoc code into a small algebra of well-behaved building blocks.  Easier to reason about today and easier to extend tomorrow.