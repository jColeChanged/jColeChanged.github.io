---
layout: post
title: Lisp Has Average Performance in Google AI Competition
published: true
description: "Scraping and analyzing the Google AI Competition rankings with Clojure. Lisp entries were closer to average than Java, despite the winner being a Lisp program."
tags: [clojure, data-analysis, ai]
---
An [r-chart blog post][1] analyzed the Google AI Competition rankings. Paul Graham's strong advocacy for Lisp made the natural question obvious: did Lisp actually outperform other languages?

The naive question -- “Is Lisp better?” -- can't be answered from competition rankings due to [selection bias][5]. Average programmers don't enter AI competitions. A narrower question works: among competition entrants, how did Lisp and Java Elo ratings compare?

I scraped the rankings using [Enlive][3] ([data here][4]) and found that the average Elo across all programs was about 2030, while Java programs averaged close to 2060 -- well within one standard deviation. Java programs are pretty average.

The average Lisp program's Elo was 2040 -- lower than Java. Not what Paul Graham's essays would predict. But averages hide structure. A box plot tells a more interesting story:

<figure>
<img src="/img/ai-comp/boxplot.png" alt="Boxplot of Java and Lisp Elo Rankings" />
</figure>

The competition winner was a Lisp program, but it was an outlier -- which undercuts the [language attribution][8] that followed the announcement. The median Lisp program ranked above average, but the worst Lisp entries were bad enough to drag the mean below Java. The [density diagram][9] from the original analysis supports this: Lisp had a wider spread with more extreme tails.

The competition didn't show Lisp to be special. It showed that language choice matters less than programmer skill, and that outliers drive narratives more than distributions do.

[1]: https://web.archive.org/web/20120204055202/http://www.r-chart.com/2010/12/google-ai-challenge-languages-used-by.html
[2]: https://web.archive.org/web/20101104134158/http://www.r-chart.com/
[3]: https://github.com/cgrand/enlive
[4]: https://spreadsheets.google.com/ccc?key=0AmdrW-WZLahvdEotcEY4VnJIMGtEWjNueXNzeElDcUE&amp;hl=en
[5]: http://en.wikipedia.org/wiki/Selection_bias

[8]: http://www.zdnet.com/blog/burnette/hungarian-lisp-developer-walks-away-with-google-ai-contest/2131
[9]: http://3.bp.blogspot.com/_FsLa1cMTCWU/TPgyBXF3PhI/AAAAAAAAAjg/M6v-8WEvv98/s1600/lisp_density_plot.png
