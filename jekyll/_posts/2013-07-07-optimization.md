---
layout: post
title: Searching A Solution Space
published: true
---

In chapter five of 
[Programming Collective Intelligence](https://www.amazon.com/Programming-Collective-Intelligence-Building-Applications-ebook/dp/B00F8QDZWG) 
I was introduced to new ways to 
go about solving 
[optimization problems](https://en.wikipedia.org/wiki/Optimization_problem). 
When I say optimization problems what I'm really
saying is that there is problems where there is a function to be minimized with 
respect to a large number of possible solutions. The 
[knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem) would be one example of an optimization 
problem.

Sometimes the search space is so vast that checking every solution would take too long. 
That is where a 
[stochastic optimization](https://en.wikipedia.org/wiki/Stochastic_optimization) 
comes in. Perhaps the 
simplest example of a stochastic optimization is taking a 
[simple random sample](https://en.wikipedia.org/wiki/Simple_random_sample) of the 
solution space and then checking each of the samples to see how much they would cost 
and returning the one that was best. The key idea being that reducing the search space 
for the sake of saving computation at the cost of accuracy.

There are much cleverer stochastic optimizations then random searching which take 
advantage of the structure of the search space. For some problems, if you were to 
picture the search space and then add another dimension to it which corresponded with 
the fitness of the solution the result could be something akin to a landscape with 
hills and valleys. The hills would be where the cost function was low and the valleys 
where the cost function was high. 

For example, take 
[hill climbing](https://en.wikipedia.org/wiki/Hill_climbing). In hill climbing, 
starting from a random point in the solution space, you look at the surrounding 
solutions in the solution space instead of all the solutions and try to head towards the 
highest-quality solutions in an iterative process. This approach is still stochastic, 
because you start from a random point. By moving down the hills into valleys the hill 
climbing algorithm will always be able to reach a local minimum where the solution is 
at least as good as the solution of it's neighbors.

This algorithm would be like dropping a ball onto the geography. It would roll downward 
until coming to rest.

This algorithm, as one can imagine, will not always reach the lowest point. It can 
get stuck in a [local optima](https://en.wikipedia.org/wiki/Local_optimum). There are other stochastic optimization algorithms which 
try to reduce the likelihood of getting stuck in local optima. Included in this set of 
algorithms are 
[simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing) and 
[genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm). 
