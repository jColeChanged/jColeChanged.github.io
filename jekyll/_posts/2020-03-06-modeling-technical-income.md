---
layout: post
title: Modeling Technical Income
published: true
author: joshuacole
---

<style type="text/css">
path {
  fill: none;
  stroke: black;
  stroke-width: 1.5px;
}
path.line {
  stroke: steelblue;
}
</style>

For some technical debt is just a list of shouldn't and best practice a list of should.
I find this to be a poor framing and one prone to producing bitterness.

My own perspective is that technical debt and best practices are actually the same thing. 
That must sound strange - how can they be the same thing: one is supposed to be good and the other bad, right?

Nope - it just seems that way because the utility generation is subject to a horizon effect.
In my mental model both lists are derived from how effort gets converted into accomplishment. 
They are both good. 
They are both bad.
Time windows control the utility perception.

Let me explain what I mean by that. 

As a first step, I'm going to ditch the word best practice. I don't consider it 
helpful for explaining this, because it doesn't prima facie suggest its complement. 

A lot of best practices and bad practices in software engineering can be better
understood through the concepts of technical debt and *technical income*.

__Technical debt__ is often understood as things which reduce the amount
of work that can be completed over a time period per unit of effort expended.
Technical income is a term I've made up which is the opposite of technical
debt. __Technical income__ is those things which increase the amount of work
that can be completed over a time period per unit of effort invested.

Often times gaining technical income takes a bit of extra work: it has an
__acquisition cost__ beyond the cost of the work being done. In other words,
it is the approach that requires a bit more planning and diligent effort.
Meanwhile, technical debt is the hasty approach, doing things directly; just
accomplishing what is asked as quickly as possible rather than accomplishing it
in the way that is best over the long term.

With these definitions in place, we can model _both_ technical debt _and_
technical income as an __effort scalar__ with an acquisition cost.
Interestingly, a lot of the common wisdom about engineering excellence and
technical debt emerges <a href="#fn-code" id="visualization" rel="footnote">from the model</a>. 

<div class="p">
  <div class="marginnote">
      <figure > 
        <span id="effortToAccomplishmentChartShortTimeFrame"></span>
      </figure>
    </div>
    Notice that in short projects all the usual caveats people give about technical
    debt being fine and the practice of engineering excellence being premature are
    present. As you add technical debt to a project, it increases the amount of
    effort needed to accomplish a given unit of work. If a project only needed ten
    units of accomplishment, you accomplish it more quickly with a hasty approach.
    The added accomplishment from easing future work doesn't produce enough benefit
    to pay for its creation.
</div>

<div class="p">
  <div class="marginnote">
    <figure>
      <div id="effortToAccomplishmentChartLongTimeFrame"></div>
    </figure>
  </div>
  However, the benefits of technical income are immense in long
  term projects. Over short time frames the hasty approach is fine, but as an
  ongoing trend it will mean disaster. Eventually the amount of work accomplished
  per effort invested will approach zero with the hasty approach. In contrast,
  as you add technical income to a project, over the long term it will mean an
  abundance of accomplishment. Eventually large amounts of work will be
  accomplishable with minimal amounts of effort investment.
</div>

This model shows us that short projects aren't helped by paying for technical income. 
The gains from the effort investment take too long to accrue for the investment to be 
paid back by the time the project ends. The model also shows that longer projects 
benefit greatly from technical income and are killed by technical debt. Over the long 
term taking on technical debt without paying it down before the effort scalar diminishes 
progress accomplished per effort invested kills the project by making it so that effort 
investment doesn't accomplish work. 

So far we have talked about these things abstractly and modeled them, but
without examples it might be hard to tie that to the daily practice of software
engineering. Concrete examples taken from industry practices can help to show
the direct relationship between the practice and the multiplier on effort.

An example of technical debt is a poorly documented and poorly understood
highly manual deployment process. In dysfunctional organizations deployments
can take a long time, because only one engineer knows how to do the deployment
and the deployment involves many manual bash commands. In order to accomplish
a release, this work needs to be done. If someone else wants to accomplish
a release, they need to learn the poorly understood system and then build
automation around it. This would be the acquisition cost to an easing of
future efforts. Unfortunately, the path of least resistance is to just let the
manual work be done again by the person who knows how to do it. So that is what
will often happen when acting hastily. The manual effort will be expended on
every release.

In direct contrast, an example of a best practice that is effectively technical
income is not taking the previously mentioned path of least resistance and instead
to do the work of automation of releases via a continuous deployment system. Now
whenever someone does a commit, in addition to the effort expended to do a commit,
there is also the additional work accomplished of doing a release. This is the
practical impact of the scalar on effort: a bit of effort is applied, but more
work gets accomplished.

Creating a long list of technical best practices could seem arbitrary, but
when seen through this lens of an effort scalar it is just recommending sets of
things which have the effect of increasing the amount of work done per unit of
effort invested.

- Documentation increases understanding acquisition per effort investment on
the part of the reader, but it also effectively the automation of an explanation
from the perspective of the writer. They give the explanation once, but each
time they would have been asked in the future, the documentation is able to
provide the answer.
- Tests automate verification processes. So potentially expensive verification
becomes relatively effortless.
- Modularity facilitating code reuse reduces the effort needed to accomplish
the next derived feature. The first visualization took a bit of effort, but the second only minutes.

<div class="p">
  These things aren't always obvious in the moment. From the workers perspective,
  there is a set amount of effort and it can feel like the environment has a
  linear return on work accomplished. After all, over the course of moments
  each action has a reaction. It takes consideration to realize that the seconds
  of work to fix an error caught by automated testing is so different than the
  weeks that might have gone into it had someone new to the domain had to solve
  the same problem and it takes an expanded perspective to realize that the
  effort that wasn't expended delivering an explanation a second time still
  generated accomplishment<label for="sn-gratitude" class="margin-toggle sidenote-number"></label>.
  <input type="checkbox"
        id="sn-gratitude"
        class="margin-toggle"/>
    <div class="sidenote">
    A suprising corollary here is that one hueristic that can help to maximize accomplishment 
    is to thank people for the accomplishments of technical income which generates value for 
    you. Since the person who took the action isn't necessarily aware that 
    their actions benefited others failing to thank them can cause them to underestimate their 
    impact whereas thanking them can help them to better realize the value they created. 
    Gratitude in these cases incents the creation of technical income.
  </div>
</div>

So lets spend a bit more time considering. What does it look like when 
you are in the position of having a lot of technical debt? What does it 
look like when you have technical income?

In a dysfunctional organization with high technical debt, the activation cost
of moving from technical debt to technical income is higher, not just because of
the distance that the effort scalar needs to move, but also because effort
doesn't accomplish as much so over a time period, so it can look like total
accomplishment is lost over a time period by making the effort. Short sighted
thinking in such an environment, even when it expands its time horizon, could
still direct toward a suboptimal long term approach.

Meanwhile, in a thriving organization, the acquisition cost of gaining even more
technical income is lower; effort already accomplishes a lot, with ease. There
is more effort to spare and the benefit of long term thinking is more apparent.

So one of the differences between a dysfunctional organizations and a thriving
organization is that the dysfunctional organization will care more about the
short term and the thriving organizations will care more about the long term.

None of this is strictly about software
engineering; it has much more broad applicability. We can see graphs like what
this model produces in technology in general as we look at the progression of
our technology over time.

Look a thousand years into the past, go a hundred years forward, the world
hasn't changed much. Look a hundred years into the past, go a hundred years
forward to arrive at the present, accomplishments come so quickly that the
entire world is changed.

Advancements like writing and reading are a form of technical income. When a
person speaks they speak out expending a little effort and they accomplish
some work. When a person writes, they write out expending a little effort and
they accomplish much more, because that which they wrote is more enduring than
the sounds which quickly faded. Its value generation reoccurs with every
reading, as opposed to the one time in which the value was generated by the
hearing.

With each little improvement, the amount of work being accomplished per unit
of effort invested in the future is going up. A thousand years ago it wasn't
enough to make a difference. A hundred years ago it had reached a point where
huge amounts of work were accomplished with effort expenditures that were often
times lower than the back breaking work of former years.

It is normal in modern society to accomplish with little effort what previous
generations could only accomplish with great effort, if they could even
accomplish it all.

So if you want to be responsible for accomplishing a lot, don't take the path
of least resistance, but instead take the slightly harder road with the
slightly higher acquisition cost, which has the property of making the future
paths easy. Don't just do your work hastily, but apply an extra bit of
diligence to make it so that future work is easier.

Make it easy and take it easy.

<script type="text/javascript" id="jsUtils">
{% include tech_income/utils.js %}
</script>
<script type="text/javascript" id="effortScalar">
{% include tech_income/tech_debt.js %}
</script>

<div id="fn-code">
<a href="#visualization">Jump back to visualization.</a>
The code to generate the visualization:
<div id="effortScalarView"></div>
<a href="#visualization">Jump back to visualization.</a>
</div>

