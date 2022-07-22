---
layout: post
title: Lisp Has Average Performance in Google AI Competition
published: true
---
 
A [blog][1] at [r-chart][2] analyzed Google AI Competition rankings. 
That blog post inspired me to try applying some of the things I've been learning about in courses offered through Carnegie Mellon's Open Learning Initiative.

The first step was to get the data. 
To do that I used a really cool scraping library called [Enlive][3] which lets you scrape HTML using CSS selectors.
Enlive is actually a templating library, but it allows for such clean separation of presentation and logic that it handles scraping too.

Here is a [public google spreadsheet][4] that has the scraped data.

The next step was to come up with some questions to answer. I've read a lot
of the writing of Paul Graham, including his strong advocation for Lisp. So
some of the questions which popped into my head as worth investigating were
related to the truth of the language's superiority. I wondered things like,
“Is Java really the language of the average programmer?” and “How did Lisp do
in comparison to Java?”

Unfortunately, those questions can't be answered with these rankings for
several reasons, including [selection bias][5]. There is a sample bias in the
dataset. Average programmers aren't joining AI competitions. So I had to come
up with a better, more narrow, set of question.

My second go produced much tamer variants of the previous questions. The first
was: How close to the average are the Java programmers in this tournament?
Unfortunately, it would be a while before I managed to answer that, as I had to
fix a bug. Where did bug come from? The answer will shock you. Canada. Yep, you
heard that right, it came from Canada. Here is the proof, see how this Canadian
doesn't come from an organization? My code expected a string.

<figure>
<img src="/img/ai-comp/snippet.png" alt="Snippet of Google AI Competition Rankings" />
</figure>

That really *bugged* me, but I ended up getting my hat on straight. It turned
out that the average elo of all the programs was about 2030, while the average
elo of the Java programs was close to 2060. This is well within one standard
deviation so to the answer to my first question is that Java programs are
pretty average.

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
program, was an outlier. That seems to go against some of the
[language attribution][8] that was going on when the winner was first
announced. Lisp does gets a little redemption though as the median Lisp program
was a good bit above the average. This means that most of the Lisp programs
were above average, but the ones that weren't tended to be so below average as
to drag them down. The [density diagram][9] shown on the blog that I mentioned
earlier seems to support this assessment.

The programming competition hasn't shown Lisp to be special. Though most Lisp
users ranked above the median, they were even closer to average than Java. Java
on the other hand was just as expected, average to the core.

That wasn't what I expected going into this, so I'm glad I got this result.

[1]: https://web.archive.org/web/20120204055202/http://www.r-chart.com/2010/12/google-ai-challenge-languages-used-by.html
[2]: https://web.archive.org/web/20101104134158/http://www.r-chart.com/
[3]: https://github.com/cgrand/enlive
[4]: https://spreadsheets.google.com/ccc?key=0AmdrW-WZLahvdEotcEY4VnJIMGtEWjNueXNzeElDcUE&amp;hl=en
[5]: http://en.wikipedia.org/wiki/Selection_bias

[8]: http://www.zdnet.com/blog/burnette/hungarian-lisp-developer-walks-away-with-google-ai-contest/2131
[9]: http://3.bp.blogspot.com/_FsLa1cMTCWU/TPgyBXF3PhI/AAAAAAAAAjg/M6v-8WEvv98/s1600/lisp_density_plot.png
