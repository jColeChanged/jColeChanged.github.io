---
layout: post
title: Horizons Effects
published: false
author: joshuacole
---

If we have the same evaluation function and we apply it to two different 
datasets we quite obviously have the capacity to get different results. Yet 
sometimes, in practice rather than theory, people fail to recognize this 
triviality. They even do so in matters that are weighty. For example, the 
Problem of Evil is a logic argument against the existence of God, but it 
is fundamentally broken as an argument. At the heart of the argument is an 
implicit claim that the same function run on two different datasets produces 
the same result. People have nevertheless failed to utterly dismiss the 
argument. It is still taught in schools. Still given credence, despite it's 
deep flaws, because primae facie the argument appears sound not because it is 
but because people evaluate it primae facie rather than from first priniciples. 

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

A lot has been said about human cognitive biases. A lot has been written on fallacious patterns of 
thought. I won't waste your time by repeating it or my time by delving into the topics. Instead 
I'll point out something that isn't obvious, because you are strategically lazy. Everything that 
evaluates something else without accounting for that evaluation changing based on an information 
horizon was lazy.

An example of how obvious this is is that some people eat food that isn't good for them, because it 
tastes good, instead of exercising. This is probably the most common example of the horizon effect. 
We encounter the difference between judging our environment by our expectations over a long time 
horizon or a short time horizon every time we make a decision about what to eat and we tend to be 
aware that we are making a decision whose correctness is conditioned on the length of time we are 
paying attention to.

A less obvious example, but perhaps more weighty, is the the famous philosophical argument against 
the existence of God. It is called the Problem of Evil. The logical argument for the lack of existence 
of God due to the existence of evil states:

> P1. If an omnipotent, omnibenevolent and omniscient god exists, then evil does not.
> P2. There is evil in the world. 
> C1. Therefore, an omnipotent, omnibenevolent and omniscient god does not exist.

A lot of people treat this argument as being worthwhile. 

It is making an argument which is claiming that `f(x)` is guaranteed to be equal to `f(subset(x))`. We 
can know there is a full `x` because omniscience is introduced. We know there is a `subset(x)` because 
we aren't omniscient, but the claim is made that there is evil in the world. When you really break things 
down though it becomes clear that the existence of omniscience in combination with the existence of 
non-omniscience creates the potential for a divergence.

It declares a guaranteed equality of evaluation function over all possible data subsets of an omniscience 
entity. Humans evaluate `f(subset(x))`. The horizon effect then leads humans to short cut their reasoning. 
They apply strategic laziness and instead of evaluating `f(x)` they approximate `f(x)` with `f(subset(x))`. 
The approximation of `f(subset(x))` is incorrect. `f(x)` is not actually guaranteed to be equal to 
`f(subset(x))`.

Not only is it false, but the introduction of differing evaluation functions is what even allows for the 
existence of evil in the first place. In order to have evil you have to have a moral evaluation and in 
order to have a moral evaluation you presuppose the existence of a way to measure moral matters and in 
order to measure moral matters you suppose the existence of an information context by which the measurement 
is made and the moment you introduce that third point while also introducing omniscience there is an implicit 
result: running a function on two different datasets doesn't guarantee the same result, but you've created 
two different datasets because there is a contrast between our datasets and the datasets that are granted to 
the omniscient. We can't make claims about the data they have with reliability, because we don't know what data 
they have.

This happens a lot earlier than full omnisciences. If you even grant a single step of horizon to an agent they 
will look crazy or evil to other agents even as they do things that are objectively good even if you assume that 
the two agents share the same evaluation function. I've demostrated this below in a simulated world. So you don't 
even need to think hard to see this is the case. Just run simulation a few times.

<div>
    <section class="three-col">            
        <section>
            <h2>Full Board</h2>
            <svg id="fullBoard"></svg>
        </section>
        <section>
            <h2>An Agent Which Can See One Space</h2>
            <svg id="oneSpaceAgent"></svg>
            <p>Score: <span id="oneSpaceScore"></span></p>
            <p>Moves: <span id="oneSpaceMoves"></span></p>
            <p>Average Score Per Move: <span id="oneSpaceAverage"></span></p>
        </section>
        <section>
            <h2>An Agent Which Can See Two Spaces</h2>
            <svg id="twoSpaceAgent"></svg>
            <p>Score: <span id="twoSpaceScore"></span></p>
            <p>Moves: <span id="twoSpaceMoves"></span></p>
            <p>Average Score Per Move: <span id="twoSpaceAverage"></span></p>
        </section>
    </section>
    <button onclick=runSimulation()>Run Simulation</button>
</div>

If just one step of additional information is enough to cause differing evaluation functions, it is quite obvious that extending it an infinte amount 
opens up the opportunity to even more divergence.

If you are Christian in particular and you don't think the Problem of Evil or Good and Evil are about hidden information, please notice that the first thing which happens after gaining knowledge of good and evil is the introduction of the concept of the hiding of information through the wearing of clothes. I'm not deeply twisting what evil is when I talk about in terms of subjective evaluation functions and hidden information.

If you are a die hard atheist who really liked this argument and wants to double down by pointing to areas in which you are very confident that `f(subset(x)) = f(x)` because of the use inference rather than argument from deductive logic: I'm a creator of artificial intelligence. I very intentionally create hidden information when building machines which learn. I also set up systems which are intentionally challenged and stressed so that they can get better over time. When you argue against the existent of a Creator from inference you argue against my own existence. You're asking me to believe that I don't exist and the root claim of your argument is that I don't exist because you have limited information. Your strong case is built atop the assumption that what you consider evil, is, but a faithful creator can intentionally create evil, because they are faithful.

Want to hear something even more insane? I use Python to do it. A snake, if you will, is my tool for doing this. It is like we're living in a simulation in which a 
creator intentionally moved things to this point so as to make the point in a way that you could more easily understand.

I create metrics by which agents are evaluated then I very intentionally set out to find the areas in which those metrics are not properly maximized toward good with full intention to get them to be good. An algorithm that experiences itself temporally would, over small time periods, conclude that I am evil because I subject it to evil experience which point out the minimization of those metrics. Yet nevertheless the end result given a larger time bound creates the condition that the evaluation of what I did maximized, not minimized, but maximized the metric.

It isn't actually good for a species to not be challenged. The tree that isn't tested by the wind doesn't know to strengthen itself so as to be robust to the wind. Your misguided notion of what creation ought to look like goes against good system design principles. Netflix, for example, intentionally causes downtime in their systems by breaking things. They do this, not to go down, but to stay up. On account of doing this they ended up staying up where others fell. You've confused `f(x) = f(subset(x))` being true with the rest of the argument being true. The argument is not sound. The claim that evil can't exist if omniscience exists is false. There is no relationship. Does food become healthy when it is junk food because you like the taste of it? Yes, says the person who doubles down, because in every case I really like the taste of junk food and so from inference I can tell that even though there is no logical argument that proves that my evaluation function is correct I insist upon my evaluation function on the basis of the surplus of evidence. Those who like the non-junk food are evil, they minimize pleasure. Yet who really minimized pleasure when the eat of junk food is in subtle pain while the eater of healthy food is thriving? I use this example, because I get the impression that some atheists are terribly conceited and think everyone else is actually secretly idiotic and just trying to rationalize rather than trying to think clearly, but in the case of junk food even they can realize that sometimes short term thinking isn't good long term thinking.

<style>
    .three-col {
        display: flex;000
        justify-content: center;
    }
    .three-col section {
        padding: 20px;
    }
</style>

Prefer Improving Vision To Judging Others


More knowledge can lead to optimal decisions which appear sub-optimal to the
blind. As a consequence, prefer learning to judgement. This logic extends 
especially unto God who knows more then all. The fall out of this would seem 
to be that a person should prefer gaining more information in order to make 
better decisions. Also worth noting is that the two space agent who knows more 
can prefer longer paths and have worse then one-move only average short-terms 
despite being logically greater in the long-term.




<script type="text/javascript" id="horizonSimulation">
{% include horizons/simulation.js %}
</script>

<div id="fn-code">
<a href="#visualization">Jump back to visualization.</a>
The code to generate the visualization:
<div id="horizonSimulationView"></div>
<a href="#visualization">Jump back to visualization.</a>
</div>

