---
layout: post
title: Dissolving the Problem Of Evil
published: true
author: joshuacole
description: "The problem of evil assumes an omniscient evaluator and a limited observer produce identical judgments. A simulation shows why that assumption fails with even one extra unit of information."
tags: [philosophy, information-theory, game-theory, theology]
---

The problem of evil has a hidden assumption: that a limited observer and an omniscient evaluator must reach the same judgment about what constitutes good action. They can't. Provably. The divergence appears the moment you add even one unit of additional information.

The argument states:

<div class="p">
  <div class="marginnote">
      <p>
        It is making an argument which is claiming that set <code>x</code> is guaranteed to be equal to 
        <code>subset(x)</code>. We can know there is a full <code>x</code> because omniscience is 
        introduced. We know there is a <code>subset(x)</code> because we aren't omniscient. 
      </p>
      <p>
        It declares a guaranteed equality of evaluation function over all possible data subsets of an omniscient 
        entity. Humans evaluate <code>f(subset(x))</code>. The omniscient evaluates <code>f(x)</code>. 
      </p>
      <p>
        If <code>f(subset(x)) = f(x)</code> in a general way then subsets are equal to sets. If the problem of evil 
        is a valid argument, then it must be the case that <code>0 = 1</code>. It isn't a valid argument. See 
        further below for a simulation demonstrating that limited information produces the observation of evil even 
        when evil does not exist.
      </p>

        <h3>Less Informed Agent</h3>
        <svg id="oneSpaceAgent"></svg>
        <p>Score: <span id="oneSpaceScore"></span></p>
        <p>Moves: <span id="oneSpaceMoves"></span></p>
        <p>Average Score Per Move: <span id="oneSpaceAverage"></span></p>

        <h3>More Informed Agent</h3>
        <svg id="twoSpaceAgent"></svg>
        <p>Score: <span id="twoSpaceScore"></span></p>
        <p>Moves: <span id="twoSpaceMoves"></span></p>
        <p>Average Score Per Move: <span id="twoSpaceAverage"></span></p>

      <p>
        I've hidden part of the board above which calls attention to the way more information lets you 
        gain utility despite that utility not being visible.
        I'm also only showing one simulation, because it should draw attention to the statistical nature of the issue. Some will watch this and conclude from their sample a falsehood - that the two agents were of equal ability.
        They aren't.
      </p>

      <p>
        A somewhat interesting caveat of great import only to certain personalities is the 
        that the average game length for the more observant agent is higher. This has radical 
        implications for how an intelligent agent ought to be made.
      </p>
  </div>
</div>

> __P1.__ If an omnipotent, omnibenevolent and omniscient god exists, then evil does not. 

> __P2.__ There is evil in the world. 

> __C1.__ Therefore, an omnipotent, omnibenevolent and omniscient god does not exist.   

P1 is where the argument breaks. It assumes that an omniscient evaluator and a limited observer, applying the same value function to different datasets, must agree on what is good. They don't have to. Below is a simulation that shows why.

Two agents share the same reward function. One agent can see one space ahead. The other can see two.
One agent can see one space in front of it. The other is ever so slightly expanded 
in terms of what it can see. It can see one additional unit. Observe that despite 
sharing the same function for valuing situations, the two agents can disagree as 
to what action is good to take. The one space agent will never explore areas in which 
there is a negative reward, but the two space agent will do things that the one space 
agent considers evil, because it could make better decisions on account of additional 
information.



What we're seeing here is that when you evaluate the problem of evil from first 
principle, using the part of the mind that is comfortable with thinking about 
things slowly and in depth, rather than using the intuitive part of the mind which 
short-circuits evaluation, the argument reveals itself to be fundamentally broken. 
Not only is it not true that omniscience results in a lack of evil, it creates the 
conditions for us to observe someone else doing evil when in fact they are doing good.

This happens well before you get to omniscience. It happens the moment you add even 
one more unit of capacity to observe what is happening. 

This should be obvious. If we have the same function, but we apply it to two different 
datasets, clearly the result can differ. Each additional unit of information just 
increases the likelihood of divergence. 

I've taken to calling this error the horizon effect, because when I see it 
happen it appears to happen on account of people having an information frontier 
which they haven't explored. They don't recognize that the dataset they evaluate 
isn't actually the only dataset present. They don't extend their thinking beyond 
the horizon, but keep it fixed on what is near at hand.

It makes sense that people do this. 

We have a limit to how much time we have. We have to use that time wisely. As a consequence, strategic 
laziness is essential. Real wisdom recommends diligence, but insight tells us that strategic laziness 
and strategic dilligence are the same thing: a choice about where to apply our time in order to be 
effective. So people do it and sometimes they make the inevitable mistakes.

We can't explore every frontier. We can't push every horizon outward. We simply don't have 
the time to do so.
If just one step of additional information is enough to cause differing evaluation functions, it is quite obvious that extending it an infinite amount 
opens up the opportunity to even more divergence.

This might feel like sloppy reasoning to someone who really likes the problem of evil. There are, after all, genuinely terrible things. Innocent children die horrible deaths.

But the argument isn't about whether evil exists from our perspective. It is about whether observing evil is sufficient to conclude that an omniscient agent is not acting toward good. The simulation shows it isn't. More knowledge can lead to optimal decisions that appear sub-optimal to a less informed observer. The two-space agent accepts short-term negative rewards because it can see that they lead to higher total return.

The practical takeaway extends beyond theology: prefer learning to judgment. When someone with more information makes a decision that looks wrong to you, the gap might be in your information, not their values.




<script type="text/javascript" id="horizonSimulation">
{% include horizons/simulation.js %}
</script>

The code to generate the visualization, imports not included:
<div id="horizonSimulationView"></div>

