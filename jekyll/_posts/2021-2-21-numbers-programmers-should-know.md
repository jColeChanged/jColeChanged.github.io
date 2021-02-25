---
layout: post
title: Numbers Programmers Should Know
published: false
author: joshuacole
---

In 2010 [Jeff][Wiki: Jeff] [Dean][Google: Jeff] gave a talk at [Stanford][Stanford] on 
performance numbers every programmer should know. [Peter Norvig][Wiki: Peter] also thought 
that [knowing these numbers][Answers: Peter] was important. Years have passed since then. 
The numbers have changed, but the importance of what the numbers measure still matters when 
building software. This post is intended to [increase factfullness][destiny instinct] in 
software engineering by refreshing our knowledge of these now outdated numbers. 

The original numbers can be seen in the table below. On the off chance that readers are 
unfamiliar with these terms, I've amended the table with links to wikipedia articles about 
the respective topics.

Metric                            | Time in ns       | Time in us  | Time in ms | Relative time
----------------------------------|------------------|-------------|------------|---------------
[L1 cache reference][wiki: cache] |           0.5 ns |             |            |
Branch mispredict                 |           5   ns |             |            |
[L2 cache reference][Wiki: cache] |           7   ns |             |            | 14x L1 cache
Mutex lock/unlock                 |          25   ns |             |            |
Main memory reference             |         100   ns |             |            | 20x L2 cache, 200x L1 cache
Compress 1K bytes with Zippy      |       3,000   ns |       3 us  |            |
Send 1K bytes over 1 Gbps network |      10,000   ns |      10 us  |            |
Read 4K randomly from SSD*        |     150,000   ns |     150 us  |            | ~1GB/sec SSD
Read 1 MB sequentially from memory|     250,000   ns |     250 us  |            |
Round trip within same datacenter |     500,000   ns |     500 us  |            |
Read 1 MB sequentially from SSD*  |   1,000,000   ns |   1,000 us  | 1 ms       |~1GB/sec SSD, 4X memory
Disk seek                         |  10,000,000   ns |  10,000 us  | 10 ms      |20x datacenter roundtrip
Read 1 MB sequentially from disk  |  20,000,000   ns |  20,000 us  | 20 ms      | 80x memory, 20X SSD
Send packet CA->Netherlands->CA   | 150,000,000   ns | 150,000 us  | 150 ms     |

Lets break down why these numbers matter. First lets start with the L1 cache and put it in context 
with main memory reference. If data is already in the cache it can be fetched in 0.5 ns, but if it 
isn't in either the L1 cache or the L2 cache then the CPU is going to be busy fetching data for 
100-200 times longer than it would have if the data was in the cache.

Imagine you go into the airport and are expecting to board your flight at the end of the day. You 
know better than to expect that you will actually get to board on time. You're expecting that after 
the usual delay of most of a day you will get to board your flight. Then it turns out you are stuck 
in the airport for the next hundred days. Being at the airport so long, you're no doubt going to get 
hungry. So you head over to the fast food court and after observing the lines you notice that the lines 
for Chik'Fil'A are going the fastest. From them you can get your food in only one second. Or so you think. 
As soon as you hop in the line an airport official abducts the Chik'Fil'A manager, leaving an airport 
official in their stead. Needless to say, after two minutes of being searched, you are given your chicken 
sandwhich a full two hundred times later than you had expected to get it.




The time taken to fetch one cache line from memory (read latency due to a cache miss) matters because the CPU will run out of things to do while waiting for the cache line. When a CPU reaches this state, it is called a stall. As CPUs become faster compared to main memory, stalls due to cache misses displace more potential computation; modern CPUs can execute hundreds of instructions in the time taken to fetch a single cache line from main memory.

The numbers that the aforementioned people think software engineers ought to know concern 
performance. If you're not interested in the details, but just want the general idea 


Some people have claimed that since the numbers are changing it only makes sense 
to know the numbers in terms of magnitude in relation to each other [1]. Others 
have tried to use models to give estimates of the numbers [2].

I think it would be valuable to have a resource for learning these numbers as they 
are, because refreshing your data is an important part of thinking well. Facts can 
change and if you aren't refreshing your data you risk using a mental model which 
was true in the past, but isn't true in the present.

According to data compiled by jboner, in 2012 the numbers were being reported as:




![2020 Estimates](/img/programming_numbers/model_estimate_2020.png)


Notes
-----

1 ns = 10^-9 seconds
1 us = 10^-6 seconds = 1,000 ns
1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns

Credit
------

By Jeff Dean:               <http://research.google.com/people/jeff/>
Originally by Peter Norvig: <http://norvig.com/21-days.html#answers>

Contributions
-------------

'Humanized' comparison:  <https://gist.github.com/hellerbarde/2843375>
Visual comparison chart: <http://i.imgur.com/k0t1e.png>


[1]: https://softwareengineering.stackexchange.com/questions/312485/how-can-jeff-deans-latency-numbers-every-programmer-should-know-be-accurate-i
[2]: https://colin-scott.github.io/personal_website/research/interactive_latency.html
[3]: https://gist.github.com/jboner/2841832

[1]: https://en.wikipedia.org/wiki/2010)
[Stanford]: https://en.wikipedia.org/wiki/Stanford_University

[Wiki: Jeff]: https://en.wikipedia.org/wiki/Jeff_Dean
[Google: Jeff]: https://research.google.com/people/jeff/

[Wiki: Peter]: https://en.wikipedia.org/wiki/Peter_Norvig
[Answers: Peter]: https://norvig.com/21-days.html#answers

[destiny instinct]: https://www.gapminder.org/factfulness/destiny/


[Wiki: cache]: https://en.wikipedia.org/wiki/CPU_cache