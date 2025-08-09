---
layout: post
title: A Summer of Collective Intelligence
published: true
---

During the summer of 2013 I was reading [Programming Collective Intelligence](book) as part of
an independent study group. The book covers a variety of machine learning
algorithms that can be used to build recommendation systems and search engines, among 
other things. Our plan was to get through two chapters each week and
then cap each week off with a Google Hangout session in which we shared what 
we learned.

I decided not just to share this with the study group, but with anyone who wanted to 
read about my learning on my blog. I figured that it would both help me learn the
material and also allow me to better see my progress.

# A Recommendation System

The second chapter is all about building recommendation systems similar in
function to the systems that give recommendations to Netflix viewers, Amazon
shoppers, and last.fm listeners. The approach that these systems take is rooted
in trying to recommend items that people who were similar to you also liked.
The real world logic goes something like this: Usually when someone recommends
something they like, another person will like it if they like similar things.
So a good way to find good recommendations would be to find users who are
similar in their preferences to whoever is getting the recommendation.

This broke the problem down into two parts. The first part was coming up with
a way to see how similar users were. The second part was using those similar
users to generate recommendations.

The first part of that problem can be broken down even further. The first step
is to define a distance function. Then the following step is merely sorting
users by the distance function to find out who is 'close' in the preference
space to the person who is getting recommendations.

There are a lot of distance functions. You can treat ratings as points and
see [how far from each other they are in Euclidean space](http://en.wikipedia.org/wiki/Euclidean_distance).
You can treat ratings as a dataset and then measure similarity by looking
at [the strength of their linear dependence](https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient).
You can even treat ratings as an admission of having seen something and then
have the measure of
[distance be the proportion of items that both parties saw to how many either saw](http://www.quora.com/Machine-Learning/What-is-Tanimoto-Score-and-when-is-it-used).
There are plenty of other distance metrics. The tricky bit is deciding which
ones makes the most sense to use.

From there the next thing that was needed was to use the most similar users to
generate recommendations. A naïve approach would be to take the most similar
user and recommend something from them, but if you think about this approach
has a drawback. It throws away the opinions of the other people who had good
taste. A smarter approach is to factor in their opinions. To do this the author
recommends items by the weighted average of their ratings where the weight is
similarity between the user who gave the rating and the user receiving the
recommendation.

<table class="table">
  <thead>
    <caption>An example of creating weights</caption>
    <tr>
      <th>Similarity</th>
      <th>Rating</th>
      <th>Weighted Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>1</td><td>1</td></tr>
    <tr><td>.5</td><td>1</td><td>.5</td></tr>
    <tr><th>Average Similarity</th><th>Average Rating</th><th>Average Weighted Rating</th></tr>
    <tr><td>.75</td><td>1</td><td>.75</td></tr>
  </tbody>
</table>

Of course once you have the weighted average there is still one gotcha. What if
some movies got more reviews than others? This can be solved by making sure
that you then proceed to adjust the weighted average by the sum of the
similarity.

# Things I Built

While working through this chapter and its example code I built:

- A movie recommendation system built on top of the MovieLens movie dataset.
- A bookmark recommendation system built on top of the Delicious API.
- A music recommendation system built on top of the last.fm API.

# A Contribution To An Open Source Project

While working through this project I developed a patch for pydelicious. I found
a bug in the pydelicious source and sent a fix upstream.

[book]: https://www.amazon.com/gp/product/0596529325/ref=as_li_tl?ie=UTF8&tag=joshuacoles-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0596529325&linkId=6e48c22fa422df9f35994c4acd00ac10