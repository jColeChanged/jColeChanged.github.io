---
layout: post
title: Lisp Had An Average Performance in Google AI Competition
published: true
---

When I was first learning to program I encountered the writings of Paul Graham.
He was a major advocate for languages in the Lisp family. 
He wrote persuasively about how not all programming languages had equal expressive power.
His writing persuaded me that Lisps were more powerful than other languages.
Later, when a [blog](https://web.archive.org/web/20120204055202/http://www.r-chart.com/2010/12/google-ai-challenge-languages-used-by.html)
at [r-chart](https://web.archive.org/web/20101104134158/http://www.r-chart.com/)
analyzed Google AI Competition rankings, it struck me that there was data about which languages were actually stronger.
That blog post inspired me to try applying some of the things I had been learning about in courses offered through Carnegie Mellon's Open Learning Initiative.

There is a process to analyzing data.
You have to get data. 
Then you have to explore it.

The first step for me was getting the data.
To do that I used a scraping library called [Enlive](https://github.com/cgrand/enlive) which allows HTML to be scraped using CSS selectors.
Enlive is actually a templating library, but it allows for such clean separation of presentation and logic that it handles scraping too.
Once I had the data the next step was to come up with some questions to answer. 
I've read a lot of the writing of Paul Graham, including his strong advocation for Lisp. 
So some of the questions which popped into my head as worth investigating were
related to the truth of the language's superiority. 
I wondered things like, “Is Java really the language of the average programmer?” and “How did Lisp do in comparison to Java?”

I really wanted to know the answer to that question, because I didn't want to be an average programmer.
I wanted to be exceptional.
Unfortunately, those questions couldn't be answered with the rankings.
There is a sample bias in the dataset.
Average programmers aren't joining AI competitions. 
So I had to come up with a better, more narrow, set of question.
My second go produced much tamer variants of the previous questions.
The first was: how close to the average are the Java programmers in this tournament?

It would be a while before I managed to answer that, as I had to fix a bug. 
Where did bug come from? 
Canada. 
My code expected a string for organization, but there was a fancy competitor in Canada who didn't need a team.

<figure>
<img src="/img/ai-comp/snippet.png" alt="Snippet of Google AI Competition Rankings" />
</figure>

This was my first time really trying to do data analysis in a serious way. 
So it was nice that I happened upon one of the things that comes up often when doing data analysis. 
Much as we might wish it was, data doesn't always come to us in a nice and tidy way.
It often needs to be prepared before we can use it in for analysis.

Once I'd made it past that lesson I discovered that the average elo of all the programs was about 2030, while the average elo of the Java programs was close to 2060. 
This is well within one standard deviation so to the answer to my first question is that Java programs are pretty average.

The second question was also fairly tame. I asked whether or not Lisp programs
tended to do better than Java programs. It turned out that they didn't. The
average Lisp programs elo was 2040. Which is lower than Java, which I wouldn't
expect given the sort of things that Paul Graham says about Lisp. This
intrigued me enough to try to ask the same question in a different way. There
are multiple measures of center after all. That investigation led to a
box plot of the Java and Lisp elo scores.

<figure>
<img src="/img/ai-comp/boxplot.png" alt="Boxplot of Java and Lisp Elo Rankings" />
</figure>

I noticed when I looked at this was that the winner of the competition, a Lisp
program, was an outlier.
That seems to go against some of the
[language attribution](http://www.zdnet.com/blog/burnette/hungarian-lisp-developer-walks-away-with-google-ai-contest/2131) that was going on when the winner was first
announced.
Lisp does gets a little redemption though as the median Lisp program
was a good bit above the average. This means that most of the Lisp programs
were above average, but the ones that weren't tended to be so below average as
to drag them down. 
The [density diagram][http://3.bp.blogspot.com/_FsLa1cMTCWU/TPgyBXF3PhI/AAAAAAAAAjg/M6v-8WEvv98/s1600/lisp_density_plot.png] shown on the blog that I mentioned earlier seems to support this assessment.

The programming competition hasn't shown Lisp to be special.
Though most Lisp
users ranked above the median, they were even closer to average than Java. 
Java on the other hand was just as expected, average to the core.