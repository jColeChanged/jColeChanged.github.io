---
layout: post
title: A Search Engine Study
published: true
---
I just finished reading through chapter four of [Programming Collective
Intelligence](https://www.amazon.com/gp/product/0596529325/ref=as_li_tl?ie=UTF8&tag=joshuacoles-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0596529325&linkId=6e48c22fa422df9f35994c4acd00ac10). It went over crawlers, search engines, and neural networks.
I ended up getting the chance to build an application which used each of these
technologies.

Some of the technologies I had encountered before. I'm not new to scraping and
a crawler is just a scraper that ends up following links to continue its work.
Having already been introduced to the topic beforehand I actually found this
section of the text to be rather disappointing. I wouldn't trust the basics of
the scraper that was given in this book, because it has a few glaring problems.
An actual crawler needs to do things like respect robots.txt and handle rate
limiting. It also might be wise to introduce caching so the same page doesn't
get scraped multiple times.

So when I wrote my scraper I did it a little differently than the author did. In
fact, I actually took a lot more inspiration from Peter Norvig than I did from
Toby Segaran. In Paradigms of Artificial Intelligence Programming there was a
beautiful method of treating a graph as a list that Peter ended up using. I
recognized that the web was a graph, so I copied the central idea of that code.

The search engine itself was much more interesting to learn about. I learned
how to make a toy search engine that ranked search results using some of the
same scoring metrics that Google is known to have used.

I think the coolest thing I learned from this section was that it's pretty easy
to use multiple metrics at the same time. You can just sum up the metrics and
sort as normal, as long as you've normalized the return values. If you want one
thing to be more important than another all you need to do is add a weight to
each metric. It becomes not too dissimilar to calculating GPA. You multiply how
well it did by how much credit things were worth to get the total amount of
credit.

I suppose this section isn't complete unless I touch on the one famous
algorithm that I implemented as a part of this chapter. PageRank.

PageRank is a famous algorithm developed by the founders of Google. It defines
the rank of every page to be the chance that a user would have reached that
page given that they had started at a random initial website and proceeding to
follow links randomly for a while.

If you spend some time thinking about it, it should be pretty obvious that
really popular sites are linked to frequently. So a person randomly clicking
around is more likely to get to one of these websites then a less popular
website. So that page would probably receive a high-score when computed using
Google's Pagerank algorithm. Meanwhile, the sites that the popular sites linked
to would also tend to be fairly popular.

# What I Did

- I built a crawler.
- I built a search engine.
- I implemented several scoring functions, including Pagerank.
- I boggled at the neural network code. I'll need to go back and re-read that section.

[book]: https://www.amazon.com/gp/product/0596529325/ref=as_li_tl?ie=UTF8&tag=joshuacoles-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0596529325&linkId=6e48c22fa422df9f35994c4acd00ac10