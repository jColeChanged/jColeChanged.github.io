---
layout: post
title: Regret Your Sins
published: true
author: joshuacole
---

<style>
.rv-dark {
  background: rgba(11,16,32,0.95);
  border-radius: 14px;
  padding: 18px;
  margin: 1.4em 0;
  color: rgba(255,255,255,0.92);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
.rv-dark h3 {
  margin: 12px 0 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}
.rv-dark p {
  color: rgba(255,255,255,0.82);
  font-size: 15px;
  line-height: 1.6;
}
.rv-dark canvas {
  width: 100%;
  height: 380px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,14,28,0.85);
  display: block;
  margin-bottom: 10px;
}
.rv-dark .tall-canvas {
  height: 440px;
}
.rv-dark .short-canvas {
  height: 320px;
}
.rv-dark code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  padding: 0.15em 0.35em;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.88);
}
.rv-cross-wrap {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 12px;
}
.rv-cross-wrap canvas {
  height: 400px;
}
.rv-cross-wrap .rv-center-cross canvas {
  height: 460px;
}
.rv-eq {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  line-height: 1.85;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.22);
  overflow-x: auto;
  white-space: nowrap;
  color: rgba(255,255,255,0.85);
}
.rv-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.18);
  font-size: 14px;
}
.rv-table th, .rv-table td {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  text-align: left;
  color: rgba(255,255,255,0.85);
}
.rv-table th {
  font-weight: 700;
  font-size: 13px;
}
.rv-table tr:last-child td { border-bottom: 0; }
.tok-sin { color: #D62828; font-weight: 750; }
.tok-cos { color: #4DA6FF; font-weight: 750; }
.tok-a   { color: #2A9C8E; font-weight: 750; }
.tok-t   { color: #F67E00; font-weight: 750; }
.tok-phi { color: #694B93; font-weight: 750; }
.frac {
  display: inline-grid;
  grid-template-rows: auto auto;
  align-items: center;
  justify-items: center;
  vertical-align: middle;
}
.frac .num { padding: 0 4px 2px; border-bottom: 1px solid rgba(255,255,255,0.45); }
.frac .den { padding: 2px 4px 0; }
</style>

There's a genre of internet atheist who thinks "regret your sins" is the dumbest possible
advice a religion could give. Low-IQ cope for people who can't face reality. Superstitious
nonsense for the credulous. Surely no *intelligent* person would organize their moral life
around the concept of *regretting what they did wrong*.

Let's check the math.

## sin(t)

The function sin(t) oscillates. It swings between -1 and +1, never settling. It's the
projection of a point moving in a circle onto one axis. cos(t) is the other axis.

If you've taken any math past high school, you know these functions. They're the backbone
of signal processing, physics, and every oscillatory system in nature.

<div class="rv-dark not-prose">
  <h3>Unit circle: point at angle <span class="tok-t">t</span></h3>
  <canvas id="circleCanvas"></canvas>

  <h3>Unwrapped waves: <span class="tok-sin">sin(t)</span> and <span class="tok-cos">cos(t)</span></h3>
  <canvas id="waveCanvas"></canvas>

</div>

What you may not have noticed is what happens when you try to find the *optimal strategy*
in a game where your opponent is also trying to beat you.

The dynamics look like sin(t). They oscillate. And the way you resolve that oscillation
into something stable is through *regret*.

## Equilibria Are Provably Optimal

In 1928, John von Neumann proved the [minimax theorem](https://en.wikipedia.org/wiki/Minimax_theorem): in any finite two-player zero-sum
game, there exist mixed strategies such that neither player can improve their expected
payoff by changing strategy unilaterally. These are *optimal* in the strongest possible
sense. Not "pretty good." Not "usually works." *No rational deviation improves your
outcome.*

In 1950, John Nash generalized this to all finite games, zero-sum or not. Every finite
game has at least one equilibrium -- proved in his one-page paper
["Equilibrium Points in N-person Games"](https://www.pnas.org/doi/10.1073/pnas.36.1.48).
He received the [Nobel Prize in Economics](https://www.nobelprize.org/prizes/economic-sciences/1994/nash/facts/)
for this in 1994.

An equilibrium strategy is the fixed point of rational play. It's what you converge to
when both sides are trying their hardest. The question that consumed the next fifty years
of game theory was: *how do you actually compute one?*

## The Answer Is Regret

The algorithm that finds optimal strategies is called **Counterfactual Regret Minimization**
(CFR). It was formalized by Zinkevich, Johanson, Bowling, and Piccione in their 2007 paper
["Regret Minimization in Games with Incomplete Information"](https://poker.cs.ualberta.ca/publications/NIPS07-cfr.pdf).
The mechanism is simple:

1. Play a round.
2. After seeing what happened, compute how much *better* you would have done if you'd
   chosen differently. This is your **regret**.
3. Accumulate regret over time. Weight your future decisions proportionally to your
   accumulated positive regret.
4. Repeat.

The convergence theorem states: the **average strategy** under regret matching converges
to Nash equilibrium. The time-averaged behavior of an agent who persistently regrets
its mistakes and adjusts accordingly is provably optimal.

This is not a heuristic. It's a theorem.

<div class="rv-dark not-prose">
  <h3>Policy head <span class="tok-phi">&pi;</span><sub><span class="tok-t">t</span></sub> (current strategy in Rock-Paper-Scissors)</h3>
  <canvas id="piCanvas"></canvas>

  <h3>Average policy <span class="tok-phi">&pi;&#772;</span><sub><span class="tok-t">t</span></sub> (running average)</h3>
  <canvas id="avgCanvas"></canvas>

  <div class="rv-eq">
    regret: <span class="tok-phi">R</span><sub><span class="tok-t">t+1</span></sub>(a)
    = <span class="tok-phi">R</span><sub><span class="tok-t">t</span></sub>(a)
    + u(a, b<sub><span class="tok-t">t</span></sub>)
    &minus; u(<span class="tok-phi">&pi;</span><sub><span class="tok-t">t</span></sub>,
    b<sub><span class="tok-t">t</span></sub>)
    &nbsp;&nbsp;|&nbsp;&nbsp;
    policy: <span class="tok-phi">&pi;</span><sub><span class="tok-t">t+1</span></sub>(a)
    = <span class="frac"><span class="num">max(<span class="tok-phi">R</span><sub><span class="tok-t">t</span></sub>(a), 0)</span><span class="den">&Sigma;<sub>a'</sub> max(<span class="tok-phi">R</span><sub><span class="tok-t">t</span></sub>(a'), 0)</span></span>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    average: <span class="tok-phi">&pi;&#772;</span><sub><span class="tok-t">T</span></sub>(a)
    = <span class="frac"><span class="num">1</span><span class="den"><span class="tok-t">T</span></span></span>
    &Sigma;<sub>t=1</sub><sup><span class="tok-t">T</span></sup>
    <span class="tok-phi">&pi;</span><sub><span class="tok-t">t</span></sub>(a)
  </div>

  <h3>Current values (500 iterations, self-play)</h3>
  <table class="rv-table">
    <thead>
      <tr>
        <th>Action</th>
        <th>Policy &pi;<sub>t</sub></th>
        <th>Average &pi;&#772;<sub>t</sub></th>
        <th>Regret R<sub>t</sub></th>
      </tr>
    </thead>
    <tbody id="statsBody"></tbody>
  </table>

</div>

Notice what just happened. The optimal learning algorithm -- the one with the convergence
proof -- works by:

- Looking at what you did.
- Computing how much you regret it.
- Adjusting your future behavior proportionally.

Over time, this process converges to the *best possible* strategy. Not "a" good strategy.
The equilibrium. The fixed point of rational play. Proven by mathematics, not asserted by
authority.

(Someone will object that "regret" is just a label computer scientists chose for a number
in a matrix. So is "energy." Try running out of it.)

## The Awards

This isn't abstract theory. CFR-based agents dominated the
[Annual Computer Poker Competition](http://www.computerpokercompetition.org/) for years.
In 2017, Libratus -- built on CFR by Noam Brown and Tuomas Sandholm at CMU -- beat four
top professional poker players in heads-up no-limit Texas hold'em over 120,000 hands.
The professionals lost by a statistically overwhelming margin. The result was published
in [*Science*](https://www.science.org/doi/10.1126/science.aao1733).

In 2019, [Pluribus](https://www.science.org/doi/10.1126/science.aay2400) extended this
to six-player no-limit hold'em and beat elite professionals again. Also published in
*Science*. The core algorithm: regret minimization. Track what you should have done
differently. Adjust. Converge.

These systems handle games with 10<sup>164</sup> possible states. They handle hidden
information, deception, and adversarial opponents. And they do it by *regretting their
mistakes*.

## The Serpent on the Pole

<div class="marginnote">
  <blockquote>
    "Make a seraph and mount it on a pole, and everyone who has been bitten
    will look at it and recover."<sup><a href="#fn-seraph">1</a></sup>
  </blockquote>
  <p>— <a href="https://bible.usccb.org/bible/numbers/21?8">Numbers 21:8</a> (NABRE)</p>
</div>

<div class="marginnote">
  <blockquote>
    "And just as Moses lifted up the serpent in the desert, so must the Son of Man
    be lifted up, so that everyone who believes in him may have eternal life."
  </blockquote>
  <p>— <a href="https://bible.usccb.org/bible/john/3?14">John 3:14-15</a> (NABRE)</p>
</div>

Here is an instruction that baffles the surface reader: to be healed from the serpent's
bite, you must *look at the serpent*. Not look away. Not pretend it didn't happen.
Confront the thing that hurt you.

Put sin on a pole. Literally. Plot sin(t) on an axis and *look at it*. That is what
the visualization above does. That is what CFR does. To converge to optimal play, you
must compute the *counterfactual* -- given what actually happened, how much better would
it have been if you had chosen differently? You don't get to ignore your mistakes. You
have to look at them. Measure them. Accumulate them. And then use that accumulated
regret to adjust.

The bronze serpent on the pole is the accumulated regret made visible. The cross is the
pole. The instruction is the same in both registers: do not avert your eyes from what
went wrong. The path to healing -- to equilibrium -- runs *through* the confrontation,
not around it.

The Hebrew tracks this. The word for the fiery serpent in Numbers 21 is *saraph*
(שָׂרָף) -- "burning one." The same word later names an angelic order: the seraphim of
Isaiah 6, who stand above God's throne. In Isaiah 6:6-7, one of these seraphim takes a
burning coal from the altar, presses it to the prophet's lips, and says: "Now that this
has touched your lips, your wickedness is removed, your sin purged." The word that names
the serpent whose bite kills becomes the word that names the angel whose fire purges sin.
The trajectory of the word *is* the trajectory of the argument: confront the burning
thing, and it heals you.

This is not an isolated motif. Scripture returns to this structure again and again.

<div class="marginnote">
  <blockquote>
    "I will make judgment a measuring line, and justice a level.
    Hail shall sweep away the refuge of lies, and waters shall flood the hiding place."
  </blockquote>
  <p>— <a href="https://bible.usccb.org/bible/isaiah/28?17">Isaiah 28:17</a> (NABRE)</p>
</div>

<div class="rv-dark not-prose">
  <div class="rv-cross-wrap">
    <div>
      <canvas id="crossLeft"></canvas>
    </div>
    <div class="rv-center-cross">
      <canvas id="crossCenter"></canvas>
    </div>
    <div>
      <canvas id="crossRight"></canvas>
    </div>
  </div>
</div>

## The Punchline

<div class="marginnote">
  <blockquote>
    "The framework I found, which made the decision incredibly easy, was what I called
    &mdash; which only a nerd would call &mdash; a 'regret minimization framework.' So I
    wanted to project myself forward to age 80 and say, 'Okay, now I'm looking back on my
    life. I want to have minimized the number of regrets I have.' I knew that when I was 80
    I was not going to regret having tried this. I was not going to regret trying to
    participate in this thing called the Internet that I thought was going to be a really
    big deal. I knew that if I failed I wouldn't regret that, but I knew the one thing I
    might regret is not ever having tried. I knew that that would haunt me every day, and
    so, when I thought about it that way it was an incredibly easy decision."
  </blockquote>
  <p>— Jeff Bezos, <a href="https://achievement.org/achiever/jeffrey-p-bezos/#interview">Academy of Achievement</a> (2001)</p>
</div>

"Regret your sins" is not low-IQ advice. It is the *optimal learning algorithm* for
agents operating under uncertainty in adversarial environments. It has a convergence
proof. It won the Nobel Prize (in the form of Nash equilibrium theory). It produced AI
systems that beat the best human players on Earth in the most complex competitive games
ever solved.

The people who mock repentance as primitive haven't noticed that the most mathematically
sophisticated learning algorithm ever deployed on adversarial problems is, structurally,
the same instruction their grandmother gave them at church.

The next move in the script is to call this "post-hoc pattern matching." You can find
parallels between anything if you squint, etc. Count the structural features:
counterfactual evaluation, not just "oops." Accumulation over history, not just the last
mistake. Proportional correction, not binary. Convergence to a fixed point, not just
"improvement." Robustness under adversarial pressure, not just comfort. A vague analogy
shares one feature with its target. This shares five. At some point squinting becomes
reading.

It's not like this is merely theoretical. Jeff Bezos left his hedge fund job and started
Amazon on what he explicitly called a "regret minimization framework." He projected
himself to age 80 and computed the counterfactual. That single application of regret
minimization built a trillion-dollar company. He didn't call it repentance. He didn't
need to. The structure did the work.

If you want to make moral claims, show at least a passing familiarity with the
mathematics of moral reasoning under uncertainty. The math says: track your regret,
adjust proportionally, and your average behavior converges to optimality.

Repentance works. It's a theorem.

## Wisdom at the Crossroads

<div class="marginnote">
  <blockquote>
    "On the way of righteousness I walk, along the paths of justice,"
  </blockquote>
  <p>— <a href="https://bible.usccb.org/bible/proverbs/8?20">Proverbs 8:20</a> (NABRE)</p>
</div>

<div class="marginnote">
  <blockquote>
    "On the top of the heights along the road, at the crossroads she takes her stand;
    by the gates at the approaches of the city, in the entryways she cries aloud:"
  </blockquote>
  <p>— <a href="https://bible.usccb.org/bible/proverbs/8?2">Proverbs 8:2-3</a> (NABRE)</p>
</div>

Scripture is not subtle about this. In Proverbs 8, Wisdom speaks in the first person.
She says she walks in the way of *righteousness*, in the paths of *justice*. Those are
the two axes of the cross -- the vertical plumb line and the horizontal measure line.
Wisdom walks where those lines run.

Then she takes her stand at the *crossroads*. The intersection. The point where
righteousness and justice meet. And from that position -- above the crossing, looking
down on the convergence point -- she calls out.

The structure is not a metaphor discovered by modern game theorists and retrofitted
onto ancient text. The ancient text describes the structure explicitly: Wisdom walks the
axes, stands at their intersection, and calls from above. The math simply caught up.

I have heard her -- audibly -- right where the scriptures say she calls out. Jesus
called too, in harmony, one voice. He likens us to sheep, which sounds like an insult
until you notice: sheep *herd*. And when you scale sin on a graph, what do you get?
A snake on a pole.

These puns are fire.

---

<small id="fn-seraph"><sup>1</sup> The NABRE transliterates the Hebrew *saraph* (שָׂרָף) rather
than translating it. Other translations render this "fiery serpent" (ESV, RSV) or
"venomous snake" (NIV). The word means "burning one."</small>

<script type="text/javascript">
{% include regret/visualizations.js %}
</script>
