---
layout: post
title: Numbers Programmers Should Know
published: false
author: joshuacole
---

In 2010 Jeff Dean gave a talk at Stanford on performance numbers every programmer 
should know. Peter Norvig also thought that knowing these numbers was important. 
Years have passed since then. The numbers have changed, but the importance of 
what the numbers measure still matters when building software. 

Some people have claimed that since the numbers are changing it only makes sense 
to know the numbers in terms of magnitude in relation to each other [1]. Others 
have tried to use models to give estimates of the numbers [2].

I think it would be valuable to have a resource for learning these numbers as they 
are, because refreshing your data is an important part of thinking well. Facts can 
change and if you aren't refreshing your data you risk using a mental model which 
was true in the past, but isn't true in the present.

According to data compiled by jboner, in 2012 the numbers were being reported as:

L1 cache reference                |           0.5 ns |             |        |
Branch mispredict                 |           5   ns |             |        |
L2 cache reference                |           7   ns |             |        | 14x L1 cache
Mutex lock/unlock                 |          25   ns |             |        |
Main memory reference             |         100   ns |             |        | 20x L2 cache, 200x L1 cache
Compress 1K bytes with Zippy      |       3,000   ns |       3 us  |        |
Send 1K bytes over 1 Gbps network |      10,000   ns |      10 us  |        |
Read 4K randomly from SSD*        |     150,000   ns |     150 us  |        | ~1GB/sec SSD
Read 1 MB sequentially from memory|     250,000   ns |     250 us  |        |
Round trip within same datacenter |     500,000   ns |     500 us  |        |
Read 1 MB sequentially from SSD*  |   1,000,000   ns |   1,000 us  | 1 ms   |~1GB/sec SSD, 4X memory
Disk seek                         |  10,000,000   ns |  10,000 us  | 10 ms  |20x datacenter roundtrip
Read 1 MB sequentially from disk  |  20,000,000   ns |  20,000 us  | 20 ms  | 80x memory, 20X SSD
Send packet CA->Netherlands->CA   | 150,000,000   ns | 150,000 us  | 150 ms |


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
[2]: https://en.wikipedia.org/wiki/Stanford_University

[Jeff Dean]: (https://en.wikipedia.org/wiki/Jeff_Dean) 
[Jeff Dean]: http://research.google.com/people/jeff/

[4]: https://en.wikipedia.org/wiki/Peter_Norvig
[5]: http://norvig.com/21-days.html#answers