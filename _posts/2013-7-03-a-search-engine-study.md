---
layout: post
title: A Search Engine Study
published: true
---
I just finished reading through chapter four of Programming Collective Intelligence. Chapter four went over crawlers, search engines, and neural networks.

#The Crawler#

A crawler is a little like a web scraping job. However, it usually doesn't scrape only one or two web pages. Instead it follows link after link, retrieving information from a host of pages.

I found the part of the book that went over making a crawler to be a little too simplistic. An actual crawler needs features that weren't included in the crawler that the book made. For one, it should support rate limiting so that you don't accidentally DDoS someone. For another he didn't bother mentioning robots.txt or caching.

I actually ended up writing some of the code a little different then he did in this section of the chapter. The web is a graph and I learned a nice way of writing code that searches graphs while reading through Paradigms of Artificial Intelligence Programming: Case Studies in Common Lisp.

#The Search Engine#

Just about everyone should be familiar with Google and their famous search engine. Some people actually think of googling as a synonym for searching. Well, I learned how to make a toy search engine that ranked search results using some of the same scoring metrics that Google is known to have used.

I think the coolest thing I learned from this section was that its pretty easy to use multiple metrics at the same time. You can just sum up the metrics and sort as normal, as long as you've normalized the return values. If you want one thing to be more important then another all you need to do is add a weight to each metric. It becomes not too dissimilar to calculating GPA. You multiple how well it did by how much credit things were worth to get the total amount of credit.

I suppose this section isn't complete unless I touch on the one famous algorithm that I implemented as a part of this chapter.

##Pagerank##

Pagerank is a famous algorithm developed by the founders of Google. It defines the rank of every page to be the chance that a user would have reached that page by randomly starting at an initial and website and proceeding to follow links randomly until they decided to stop.

If you spend some time thinking about it, it should be pretty obvious that really popular sites are linked to frequently. So a person randomly clicking around is more likely to get to one of these websites then a less popular website. So that page would probably receive a high-score when computed using Google’s Pagerank algorithm. Meanwhile, the sites that the popular sites linked to would also tend to be fairly popular.

#What I Did#

- I built a crawler.
- I built a search engine.
- I implemented several scoring functions.