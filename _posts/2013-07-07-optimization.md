---
layout: post
title: Searching A Solution Space
published: true
---
In the latest chapter of Programming Collective Intelligence I was introduced to ways to go about solving optimization problems. When I say optimization problem what I'm really saying is that there is a function to be minimized and a large number of solutions. The famous knapsack problem would be one example of this sort of optimization. However, programming collective intelligence made no mention of the knapsack problem. It wasn't interested in showing how to use memoization and dynamic programming to speed up computation.

Instead it talked about a different type of optimization problem. Sometimes the search space is so vast that checking every solution won't work. So instead you need a different process. That is where a stochastic optimization comes in. Perhaps the simplest example of a stochastic optimization is taking a simple random sample of the solution space and then checking each of the samples to see how much they would cost and returning the one that was best. The key idea here is your reducing the search space for the sake of saving computation. Of course its easy to see there is a trade off in accuracy. You might save on computation but accuracy isn't ensured.

Luckily there are much cleverer stochastic optimizations then random searching. If you were to picture the search space and then add another dimension the result would be something not to different then a landscape with hills and valleys. The hills would be where the cost function was low and the valleys where the cost function was high. At least it would be that way for some types of problems. Making use of this geography allows for different algorithms.

For example, take hill climbing. In hill climbing you look at the surrounding solutions in the solution space instead of all the solutions and try to head towards the highest-quality solutions in an iterative process. This approach is still stochastic, because you start from a random point. If you always started at the same point it wouldn't be stochastic. However, by moving down the hills into valleys the hill climbing algorithm will always be able to reach a local minimum. That is to say it will always reach a point where its neighbors are all higher then it, but not won't necessarily reach the very lowest point.

This algorithm would be like dropping a ball onto the geography. It would roll downward until coming to rest.

This algorithm, as one can imagine, will not always reach the lowest point. Other algorithms try to increase the likely hood of reaching a lower point by being even more stochastic then hill climbing. In addition to making random changes that make things better, they also introduce changes which might make things worse. This lets them search a greater area of the solution space. Included in this set of algorithms are simulated annealing and genetic algorithms.