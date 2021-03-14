---
layout: post
title: Searching A Solution Space
published: true
---

In chapter five of [Programming Collective Intelligence][1] I was introduced to
new ways to go about solving [optimization problems][2]. When I say
optimization problems what I'm really saying is that there is problems where
there is a function to be minimized with respect to a large number of possible
solutions. The [knapsack problem][3] would be one example of an optimization
problem.

Sometimes the search space is so vast that checking every solution would take
too long. That is where a [stochastic optimization][4] comes in. Perhaps the
simplest example of a stochastic optimization is taking a
[simple random sample][5] of the solution space and then checking each of the
samples to see how much they would cost and returning the one that was best.
The key idea being that reducing the search space for the sake of saving
computation at the cost of accuracy.

There are much cleverer stochastic optimizations then random searching which
take advantage of the structure of the search space. For some problems, if you
were to picture the search space and then add another dimension to it which
corresponded with the fitness of the solution the result could be something
akin to a landscape with hills and valleys. The hills would be where the cost
function was low and the valleys where the cost function was high.

For example, take [hill climbing][6]. In hill climbing, starting from a random
point in the solution space, you look at the surrounding solutions in the
solution space instead of all the solutions and try to head towards the
highest-quality solutions in an iterative process. This approach is still
stochastic, because you start from a random point. By moving down the hills
into valleys the hill climbing algorithm will always be able to reach a local
minimum where the solution is at least as good as the solution of it's
neighbors.

This algorithm would be like dropping a ball onto the geography. It would roll
downward until coming to rest.

This algorithm, as one can imagine, will not always reach the lowest point. It
can get stuck in a [local optima][7]. There are other stochastic optimization
algorithms which try to reduce the likelihood of getting stuck in local optima.
Included in this set of algorithms are [simulated annealing][8] and
[genetic algorithms][9].

[1]: https://www.amazon.com/gp/product/0596529325/ref=as_li_tl?ie=UTF8&tag=joshuacoles-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0596529325&linkId=6e48c22fa422df9f35994c4acd00ac10
[2]: https://en.wikipedia.org/wiki/Optimization_problem
[3]: https://en.wikipedia.org/wiki/Knapsack_problem
[4]: https://en.wikipedia.org/wiki/Stochastic_optimization
[5]: https://en.wikipedia.org/wiki/Simple_random_sample
[6]: https://en.wikipedia.org/wiki/Hill_climbing
[7]: https://en.wikipedia.org/wiki/Local_optimum
[8]: https://en.wikipedia.org/wiki/Simulated_annealing
[9]: https://en.wikipedia.org/wiki/Genetic_algorithm
