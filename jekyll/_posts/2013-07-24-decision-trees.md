---
layout: post
title: Classification With Trees
published: true
---
Yesterday I completed chapter seven of Programming Collective Intelligence. I
struggled with the chapter a little, which I found a little surprising.
Decision trees were touted as simple, but I still have so many questions about
them. Part of the reason that I feel a little less confident is that I was a
bit lazy. I skipped the chapter exercises in favor of reading
[an article on decision trees](http://www.onlamp.com/lpt/a/6464).

Decision trees are a machine learning technique that can be used for
classification. Unlike a lot of classification algorithms, decision trees are a
whitebox. That means you can actually get an explanation for why they classify
something the way that they do. The procedure used to generate a decision tree
tends to divide up data in a way that is useful. For example, lets say you are
getting users coming to your site from various sources and you are classifying
on whether they subscribe. Decision trees would quickly surface that some
sites are better at converting then others. So decision trees are useful as a
tool to learn things about a dataset.

Decision trees do have some problems though. They are discrete decision
boundaries. Other techniques end up handling continuous data problems better.
They also don't support learning; you can't give them new data to learn from
after their training is done.

Decision trees look about like what you would expect. They are a series of
if-then statements that are arranged into a tree. The questions are branches
on the tree and the predictions are the leaves. The classification step is
pretty easy. You simply move through the branches based on the features of
your dataset until you get to a leaf node. Then once your at a leaf node you
have your classification.

Training is a little more difficult. The main idea is that at each stage you
want to generate a question that splits the dataset such that you learn the
most. Fancy math is used to get this result. Basically you use something
called entropy to help calculate the information gain.
