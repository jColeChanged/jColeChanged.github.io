---
layout: post
title: Collective Classification
published: true
---
This is another blog post in my series of blogs posts covering my reading of Programming Collective Intelligence. A lot of the group members have had full-plates as of late. Some are working on start-ups, others are working through other books, and some are doing additional study groups. As a result the group has decided to cut back to one chapter per week. I'm finding that pace to be quite comfortable.

This weeks chapter was on document classification. I've done something a bit like it before when as a part of my Google internship application I wrote a Naive Bayes Classifier minus the classification which ranked job applicants according to their chances of being hired. So in a way this chapter was a bit of review.

However, unlike what I wrote in the past this program took an extra step after getting the probabilities. It didn't try to rank things. It tried to classify them. So it might try to put things into two bins: spam and not spam.

This actually changed the problem a little bit. It turns out there is more going on when you are classifying then mapping a curried probability of an item over every category and taking the category which had the highest probability. You can consider getting fancy and give preferential treatment to some categories. For example in the case of classifying spam, you might give special treatment to the not-spam category in order to ensure that users don't miss their mail.