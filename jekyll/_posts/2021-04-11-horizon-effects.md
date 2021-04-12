---
layout: post
title: Horizons Effects
published: false
author: joshuacole
---

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


<script type="text/javascript" id="horizonSimulation">
{% include horizons/simulation.js %}
</script>

<div id="fn-code">
<a href="#visualization">Jump back to visualization.</a>
The code to generate the visualization:
<div id="horizonSimulationView"></div>
<a href="#visualization">Jump back to visualization.</a>
</div>

