---
layout: post
title: Lisp Has Average Performance in Google AI Competition
published: true
---
A while back a [blog](http://www.r-chart.com/2010/12/google-ai-challenge-languages-used-by.html) at [r-chart](http://www.r-chart.com/) analyzed 
the Google AI Competition rankings. That blog post inspired me to try applying some of the 
things I've been learning about in courses offered through Carnegie Mellon's Open Learning Initiative. 


The first step was to get the data. To do that I used a really cool scraping library 
called [Enlive](https://github.com/cgrand/enlive) which lets you scrape HTML using CSS 
selectors. Enlive is actually a templating library, but it allows for such clean 
separation of presentation and logic that it handles scraping too.

Here is a [public google spreadsheet](https://spreadsheets.google.com/ccc?key=0AmdrW-WZLahvdEotcEY4VnJIMGtEWjNueXNzeElDcUE&amp;hl=en) that has the scraped data.

The next step was to come up with some questions to answer. The obvious ones popped into my head, &ldquo;Is Java really 
the language of the average programmer? How did Lisp do in comparison to Java?&rdquo; Unfortunately, those questions 
can&rsquo;t be answered with these rankings due to&nbsp;<a href="http://en.wikipedia.org/wiki/Selection_bias" style="font-size: 18px; font: inherit; vertical-align: baseline; padding: 0px; margin: 0px;">selection bias</a>. 
There is a sample bias in the dataset. Average programmers aren't joining AI competitions.  So I had to come up with a 
better, more narrow, questions.


My second go produced much tamer variants of the previous questions. The first was: How close to the average are the 
Java programmers in this tournament? Unfortunately, it would be a while before I managed to answer that, as I had to 
fix a bug. Where did bug come from? The answer will shock you. Canada. Yep, you heard that right, it came from Canada.
 Here is the proof, see how this Canadian doesn&rsquo;t come from an organization? My code expected a string.

![Snippet of Google AI Competition Rankings](/img/ai-comp/snippet.png) 


That really bugged me, but I ended up getting my hat on straight. It turned out that the average elo of all the programs 
was about 2030, while the average elo of the Java programs was close to 2060. This is well within one standard deviation 
so to the answer to my first question is that Java programs are pretty average.


The second question was also fairly tame. I asked whether or not Lisp programs tended to do better than Java programs. 
It turned out that they didn&rsquo;t. The average Lisp program&rsquo;s elo was 2040. This intrigued me enough to try to 
ask the same question in a different way. There are multiple measures of center after all. That investigation led to a 
box plot of the Java and Lisp elo scores.


![Boxplot of Java and Lisp Elo Rankings](/img/ai-comp/boxplot.png "Boxplot of Java and Lisp Elo Rankings")


I noticed when I looked at this was that the winner of the competition, a Lisp program, 
was an outlier. That seems to go against some of the&nbsp;<a href="http://www.zdnet.com/blog/burnette/hungarian-lisp-developer-walks-away-with-google-ai-contest/2131" style="font-size: 18px; font: inherit; vertical-align: baseline; padding: 0px; margin: 0px;">language attribution</a>&nbsp;that was going on when the winner was first announced. Lisp does gets a little redemption though as the median Lisp program was a good bit above the average. This means that most of the Lisp programs were above average, but the ones that weren't tended to be so below average as to drag them down. The&nbsp;<a href="http://3.bp.blogspot.com/_FsLa1cMTCWU/TPgyBXF3PhI/AAAAAAAAAjg/M6v-8WEvv98/s1600/lisp_density_plot.png" style="font-size: 18px; font: inherit; vertical-align: baseline; padding: 0px; margin: 0px;">density diagram</a>&nbsp;shown on the blog that I mentioned earlier seems to support this assessment.


It looks like this programming competition hasn&rsquo;t shown Lisp to be very special. Though most Lisp users were above average, together they were even closer to average than Java. Java on the other hand was just as expected, average to the core.

That wasn't what I expected going into this, so I'm glad I got this result.