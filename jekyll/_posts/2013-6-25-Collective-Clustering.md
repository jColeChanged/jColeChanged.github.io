---
layout: post
title: Collective Clustering
published: true
---

This is my second post in a series I'm writing on my foray into Programming Collective Intelligence. In this installment I'm talking about chapter three, which covers clustering.

## Hierarchical Clustering

[Hierarchical clustering](http://en.wikipedia.org/wiki/Hierarchical_clustering) starts out by saying that every element that you are looking at is its own distinct cluster. Then it tries to find the two clusters that are closest to each other. Once it finds those clusters it merges them. In some ways things are arbitrary. I can choose to look at any number of clusters I want. If I only want to look at three clusters I can stop running things when I get down to three clusters. However, I can also make a [dendrogram](http://en.wikipedia.org/wiki/Dendrogram) if I make sure to incorporate the tree-like structure of the clustering process into my code.

While working through the last chapter I happened to create a few dendrodgrams. The dendrogram presented below is the result of clustering 100 of the most popular blogs by the words used in their RSS feed. Of particular interest is that Google search related blogs tended to come out near each other.

![Dendrogram of Blog Clustering by Word Use](/img/collective-cluster/dend1.jpg "Dendrogram of Blog Clustering by Word Use")

A far more interesting dendogram that I produced show what desires tend to be grouped together. A now dead site named zebo.com used to collect information about what people wanted. Using the data that they had made available I made a dendrogram of what things people tended to like. I found pursuing this graphic to be quite enjoyable.

![Dendrogram of Desires by Shared Desires](/img/collective-cluster/dend2.jpg "Dendrogram of Desires by Shared Desires")

## k-means Clustering

Earlier I said that hierarchical clustering compared everything to everything else in order to figure out what two clusters were the closest to each other. As you can imagine this has terrible performance. O(n^2) to be more precise. Memoziation can be used to make things a bit faster then that in practice, but the algorithm still doesn't have the most wonderful scaling properties even with that. That is where K Means clustering comes in.

In [k-means clustering](http://en.wikipedia.org/wiki/K-means_clustering) you basically establish some dummy clusters called centroids. You create k of them. Then you find the closest centroid to a cluster. You lose the ability to make a dendrogram, things becomes even more arbitrary since the centroid selection is pretty random, and in exchange you gain an O(nk) search for the nearest element.

## Multidimensional Scaling

In multidimensional scaling you keep jiggering things by comparing them to a distance function on two variables and seeing how much that differs from a distant function on all the variables. This lets you drop down variables while maintaining some sense of correlation. It lets you plot things that have multiple dimensions in two dimensional space. I have an example of this below too.

![Blogs By Scaled Down Word Count Feature Vector](/img/collective-cluster/scaled.jpg "Blogs By Scaled Down Word Count Feature Vector")

## Things I Built

- I visualized delicious data via a dendrogram that I computed.
- I implemented euclidean and manhattan distance algorithms and tries them out in clustering.
- I experimented with different values of k when using k-means clustering and saw how it affected the clustering error.
- I implemented multidimensional scaling for both one dimension and three dimensions.
