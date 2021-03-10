---
layout: post
title: Latency Numbers Programmers Should Know
published: false
author: joshuacole
---

In 2010 [Jeff][Wiki: Jeff] [Dean][Google: Jeff] gave a talk at [Stanford][Stanford] on 
performance numbers every programmer should know. [Peter Norvig][Wiki: Peter] also thought 
that [knowing these numbers][Answers: Peter] was important. Years have passed since then. 
The numbers have changed, but the importance of what the numbers measure still matters when 
building software. This post is intended to [increase factfullness][destiny instinct] in 
software engineering by refreshing our knowledge of these now outdated numbers. 

## The Original Numbers

The original numbers can be seen in the table below. On the off chance that readers are 
unfamiliar with these terms, I've amended the table with links to wikipedia articles about 
the respective topics.

Metric                            | Time in ns       | Time in us  | Time in ms | Relative time
----------------------------------|------------------|-------------|------------|---------------
[L1 cache reference][wiki: cache] |           0.5 ns |             |            |
[Branch mispredict][Wiki: predict]|           5   ns |             |            |
[L2 cache reference][Wiki: cache] |           7   ns |             |            | 14x L1 cache
[Mutex lock/unlock][Wiki: lock]   |          25   ns |             |            |
[Main memory reference][Wiki: mem]|         100   ns |             |            | 20x L2 cache, 200x L1 cache
[Compress 1K bytes with Zippy][Wiki: zippy] |       3,000   ns |       3 us  |            |
[Send 1K bytes over 1 Gbps network][Wiki: network] |      10,000   ns |      10 us  |            |
[Read 4K randomly from SSD][[Wiki: ssd] ]        |     150,000   ns |     150 us  |            | ~1GB/sec SSD
Read 1 MB sequentially from memory |     250,000   ns |     250 us  |            |
Round trip within same datacenter |     500,000   ns |     500 us  |            |
[Read 1 MB sequentially from SSD][Wiki ssd] |   1,000,000   ns |   1,000 us  | 1 ms       |~1GB/sec SSD, 4X memory
[Disk seek][Wiki: HD]                         |  10,000,000   ns |  10,000 us  | 10 ms      |20x datacenter roundtrip
[Read 1 MB sequentially from disk][Wiki: HD]  |  20,000,000   ns |  20,000 us  | 20 ms      | 80x memory, 20X SSD
Send packet CA->Netherlands->CA   | 150,000,000   ns | 150,000 us  | 150 ms     |

Lets break down why these numbers matter. First lets start with the L1 cache and put it in context 
with main memory reference. If data is already in the cache it can be fetched in 0.5 ns, but if it 
isn't in either the L1 cache or the L2 cache then the CPU is going to be busy fetching data for 
100-200 times longer than it would have if the data was in the cache.

The time taken to fetch one cache line from memory (read latency due to a cache miss) matters because the CPU will run out of things to do while waiting for the cache line. When a CPU reaches this state, it is called a stall. As CPUs become faster compared to main memory, stalls due to cache misses displace more potential computation; modern CPUs can execute hundreds of instructions in the time taken to fetch a single cache line from main memory.

In terms that are more relatable the difference between getting a cache hit versus accessing main 
memory is like the difference between doing something that takes one minute versus doing something 
which takes a bit more than three hours.

Combine that with how branch predictions gone wrong are ten times more expensive than an L1 cache 
hit and we can start to see some of why it is that these numbers are so important to know. If you 
write your low level code so that the computer has a good idea of what data it needs and what paths 
it might be taking it can [speed up execution by a considerable constant factor][so: speedy].

Next lets break down compression and relate it to reading data. It takes 3000 ns to compress 
1K bytes, but it takes 10,000 ns to send that many bytes over the network. We can assume that 
compressing 4k bytes is going to take 12000 ns, but reading 4k bytes from an SSD will take 
150,000 ns. That is an ideal for reading from storage devices and via the network. Things 
start getting much more expensive as we progress down the list.

If you think about this for a bit it implies something. There is a point at which speed is 
going to be increased by compressing data, because compressing a lot of data and sending the 
small amount of resulting data is faster than not compressing and sending the raw data 
and you start gaining a latency advantage in terms of sending data at a lower data threshold 
than might seem intuitive when thinking about things from a human perspective. One way to think 
about why compression before sending is better is to convert these numbers to your intuition. Packing 
your bag before you hop on a flight is a bit faster than taking a plane trip per item. 

The exact amount of when it becomes worthwhile to do this is a bit hard to say without knowing 
your data. Some data formats are already compressed so you don't get as much utility from 
compresing them. For Snappy in particular as a compression mechanism the Google repo for the project 
says it performs as follows:

<div class="p">
    <blockquote>
        Typical compression ratios (based on the benchmark suite) are about 1.5-1.7x for plain text, about 2-4x for HTML, and of course 1.0x for JPEGs, PNGs and other already-compressed data. Similar numbers for zlib in its fastest mode are 2.6-2.8x, 3-7x and 1.0x, respectively. More sophisticated algorithms are capable of achieving yet higher compression rates, although usually at the expense of speed. Of course, compression ratio will vary significantly with the input.
    </blockquote>
    <footer>
        <a href="https://github.com/google/snappy/blob/ea368c2f07de5f31146a10214f27d15091b09771/README.md#performance">Google Snappy Github README</a>
    </footer>
</div>

In the hypothetical where you are dealing with processing of a large amount of text data, 
maybe in preperation for feeding that data into a nueral network, and the size of the data 
requires you to split up the computation across multiple computers which itself involves a 
step in which data must be transferred to those computers by some mechanism we might expect 
to have a nearly 2x reduction in file size. This could result in a nearly 2x improvement 
in time spent reading data from the network and time spent reading data from disk. Which, 
as shown in the stats, is one of the most costly operations.

Another thing to notice is the difference between having the data already in-memory versus 
having to get that data from the disk. If data is already in-memory then that data is going 
to be taking only 100 ns to access. Loading 1 MB of data on the other hand can take 
1,000,000 ns and then you're still going to be referencing it after you load it regardless.
The implications are that keeping your data in-memory rather than on disk can have huge 
performance benefits. In fact, since transferring data over the network within a datacenter 
is less expensive than reading data from disk, if speed of computation is your goal then it 
can make sense to store data in memory even if your computer doesn't have enough memory to 
store the data in memory.

So if you ever wondered why so many of those cache servers and databases make a point of advertising 
that they are serving data from memory? Now you know. Doing so is a lot faster than serving that 
same data from disk.

So that is what the numbers were and what the implications of the numbers being what they were is.
What are the numbers now? How have they been changing? Does it even matter?


## The Numbers As Reported Elsewhere

Earlier I mentioned that the numbers have been changing. They have been. 
Some people have claimed that since the numbers are changing it only makes sense 
to know the numbers in terms of magnitude in relation to each other [1]. This is 
a great point and it does help protect a person from the fact that the numbers 
are changing and there information may get out of date. However, that doesn't 
mean we don't have to validate the assumption that the numbers haven't changed. 
Test all things, hold fast that which is good.

An infographic was produced which goes over estimates of what the numbers could be 
as the years go by. You can see a picture of this infographic here. If we dig into 
the sourcing of it what we will discover is the estimates are based on models. Worse
those models haven't been particularly accurate.


<figure class="fullwidth">
    <figcaption>Model Based Estimate of Latency Numbers</figcaption>
    <img src="/img/programming_numbers/model_estimate_2020.png" alt="a visualization of 2020 latency numbers" />
</figure>



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
[Wiki: predict]: https://en.wikipedia.org/wiki/Branch_predictor
[Wiki: lock]: https://en.wikipedia.org/wiki/Lock_(computer_science)
[Wiki: mem]: https://en.wikipedia.org/wiki/Computer_data_storage#Primary_storage
[Wiki: zippy]: https://en.wikipedia.org/wiki/Snappy_(compression)
[Wiki: network]: https://en.wikipedia.org/wiki/Network_traffic
[Wiki: ssd]: https://en.wikipedia.org/wiki/Solid-state_drive
[Wiki: hd]: https://en.wikipedia.org/wiki/Hard_disk_drive

[so: speedy]: https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array