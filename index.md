---
title: Home
layout: default
---

<section class="mt-16 md:mt-20">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
    <div class="md:col-span-2">
      <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Joshua Cole</h1>
      <p class="mt-3 text-lg text-slate-600 max-w-2xl">Founder of <a href="https://tacktech.ai/" class="text-blue-600 hover:underline">Mieza</a>. Building game-theoretic AI that computes provably optimal strategies.</p>
      <div class="mt-6 flex gap-3 hero-cta">
        <a class="btn" href="/writing.html">Read writing</a>
        <a class="btn-secondary" href="/projects.html">See projects</a>
      </div>
      <div class="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
        <span class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1">Mieza CEO</span>
        <span class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1">Principal Engineer @ Walmart</span>
        <span class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1">Ex-Amazon</span>
        <span class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1">Ex-Meta</span>
      </div>
      <div class="mt-6 flex gap-4 text-slate-700">
        <a class="flex items-center gap-2 hover:text-blue-700" href="https://github.com/jcolechanged" target="_blank">{% include social_icon.html name="github" %} <span>GitHub</span></a>
        <a class="flex items-center gap-2 hover:text-blue-700" href="https://tacktech.ai/" target="_blank">{% include social_icon.html name="tacktech" %} <span>Mieza</span></a>
        <a class="flex items-center gap-2 hover:text-blue-700" href="https://www.twitter.com/combinatoricole" target="_blank">{% include social_icon.html name="twitter" %} <span>Twitter</span></a>
      </div>
    </div>
    <div class="justify-self-center w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-1 ring-slate-200 shadow-md">
      <img src="{{ '/img/joshua.png' | relative_url }}" alt="Joshua Cole" class="w-full h-full object-cover"/>
    </div>
  </div>
</section>

<section class="mt-20 md:mt-28 pt-6 border-t border-slate-200">
  <!-- Row 1: short tags/bullets -->
  <h2 class="text-xl font-semibold text-slate-900 mb-3">At a glance</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
      <h3 class="text-sm font-semibold text-slate-700">What I'm Doing Now</h3>
      <ul class="mt-2 list-disc list-inside text-slate-700">
        <li>Building GenAI systems @ <a class="text-blue-600 hover:underline" href="https://tech.walmart.com/" target="_blank" rel="noopener">Walmart</a></li>
        <li>Solving safe exploitation @ <a class="text-blue-600 hover:underline" href="https://tacktech.ai/" target="_blank" rel="noopener">Mieza</a></li>
        <li>Grounding LLMs in GTO policies @ <a class="text-blue-600 hover:underline" href="https://tacktech.ai/" target="_blank" rel="noopener">Mieza</a></li>
      </ul>
    </div>
    <div class="rounded-xl ring-1 ring-slate-200 p-5 bg-white">
      <h3 class="text-sm font-semibold text-slate-700">What I was doing previously</h3>
      <ul class="mt-2 list-disc list-inside text-slate-700">
        <li>Experimentation platforms @ <a class="text-blue-600 hover:underline" href="https://developer.amazon.com/alexa" target="_blank" rel="noopener">Amazon Alexa</a></li>
        <li>At‑scale ML @ <a class="text-blue-600 hover:underline" href="https://ai.meta.com/" target="_blank" rel="noopener">Meta</a></li>
        <li>Award‑winning products @ <a class="text-blue-600 hover:underline" href="https://www.snapone.com/" target="_blank" rel="noopener">Pakedge</a> & <a class="text-blue-600 hover:underline" href="https://www.control4.com/" target="_blank" rel="noopener">Control4</a></li>
      </ul>
    </div>
    
  </div>

  <!-- Row 2: longform context -->
  <div class="prose prose-slate lg:prose-lg max-w-none mt-12">
    <p>Today I split my time between two arenas. As a Principal Software Engineer at <a href="https://tech.walmart.com/" target="_blank" rel="noopener">Walmart</a> I build generative‑AI systems that must be safe, reliable, and cost‑effective at retail scale. As CEO and sole engineer at <a href="https://tacktech.ai/" target="_blank" rel="noopener">Mieza</a>, I build game‑theoretic AI -- solvers that compute provably optimal strategies for domains with hidden information and adversarial dynamics.</p>

    <p>Previously I built experimentation platforms at <a href="https://developer.amazon.com/alexa" target="_blank" rel="noopener">Amazon Alexa</a>, enabling fast, trustworthy product iteration. Before that I worked at <a href="https://ai.meta.com/" target="_blank" rel="noopener">Meta</a> on at‑scale machine learning over pixel data. Earlier in my career I shipped award‑recognized, production‑grade platforms with <a href="https://www.snapone.com/" target="_blank" rel="noopener">Pakedge</a> and <a href="https://www.control4.com/" target="_blank" rel="noopener">Control4</a> (including a <a href="https://www.commercialintegrator.com/awards/ci-best-awards/" target="_blank" rel="noopener">CI BEST Award</a>) and helped keep Pakedge at the top of the <a href="https://www.cepro.com/brands/brand-analysis/" target="_blank" rel="noopener">CE Pro Brand Leader</a> list for multiple years.</p>
  </div>
</section>

<section class="mt-12">
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-semibold text-slate-900">Featured writing</h2>
    <a class="text-sm text-blue-600 hover:underline" href="/writing.html">View all →</a>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {% assign featured = site.posts | sort: 'date' | reverse | slice: 0, 6 %}
    {% for post in featured %}
      <div class="ring-1 ring-slate-200 rounded-xl p-5 bg-white hover:ring-slate-300 transition">
        <a class="block font-semibold text-slate-900 hover:text-blue-700" href="{{ post.url }}">{{ post.title }}</a>
        <div class="mt-1 text-sm text-slate-500">{{ post.date | date: "%b %d, %Y" }}</div>
        <div class="mt-2 text-slate-700">{{ post.excerpt | strip_html | truncatewords: 24 }}</div>
      </div>
    {% endfor %}
  </div>
</section>



<section class="mt-5">
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-semibold text-slate-900">Projects</h2>
    <a class="text-sm text-blue-600 hover:underline" href="/projects.html">View all →</a>
  </div>
  <div class="ring-1 ring-slate-200 rounded-xl p-6 bg-white mb-4">
    <a class="block text-lg font-bold text-slate-900 hover:text-blue-700" href="https://tacktech.ai/" target="_blank">Mieza</a>
    <div class="mt-2 text-slate-700">Game-theoretic AI that computes provably optimal strategies for domains with hidden information and adversarial dynamics. Equilibrium solvers, not heuristics.</div>
    <a class="mt-3 inline-block btn" href="https://tacktech.ai/" target="_blank">tacktech.ai</a>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="ring-1 ring-slate-200 rounded-xl p-5 bg-white hover:ring-slate-300 transition">
      <a class="block font-semibold text-slate-900 hover:text-blue-700" href="/svg2d3.html">SVG → D3.js Compiler</a>
      <div class="mt-2 text-sm text-slate-600">Convert SVG paths to D3.js code quickly.</div>
    </div>
    <div class="ring-1 ring-slate-200 rounded-xl p-5 bg-white hover:ring-slate-300 transition">
      <a class="block font-semibold text-slate-900 hover:text-blue-700" href="https://github.com/jColeChanged/josh.meanings" target="_blank">josh.meanings</a>
      <div class="mt-2 text-sm text-slate-600">Medium‑data K‑means in Clojure: mmap datasets, GPU distance functions, modern inits.</div>
      <a class="mt-3 inline-block btn-secondary" href="https://github.com/jColeChanged/josh.meanings" target="_blank">View repo</a>
    </div>
    <div class="ring-1 ring-slate-200 rounded-xl p-5 bg-white hover:ring-slate-300 transition">
      <a class="block font-semibold text-slate-900 hover:text-blue-700" href="https://github.com/jColeChanged/think-progress" target="_blank">Think‑Progress</a>
      <div class="mt-2 text-sm text-slate-600">A reinvention of progress bars for known‑steps tasks; shows momentum and history.</div>
      <a class="mt-3 inline-block btn-secondary" href="https://github.com/jColeChanged/think-progress" target="_blank">View repo</a>
    </div>
  </div>
</section>

<section class="mt-5">
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-semibold text-slate-900">Elsewhere</h2>
    <a class="text-sm text-blue-600 hover:underline" href="/links.html">All links →</a>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <a class="ring-1 ring-slate-200 rounded-xl p-4 bg-white hover:ring-slate-300 transition flex items-center gap-2" href="https://github.com/jcolechanged" target="_blank">
      {% include social_icon.html name="github" %} <span>GitHub</span>
    </a>
    <a class="ring-1 ring-slate-200 rounded-xl p-4 bg-white hover:ring-slate-300 transition flex items-center gap-2" href="https://tacktech.ai/" target="_blank">
      {% include social_icon.html name="tacktech" %} <span>Mieza</span>
    </a>
    <a class="ring-1 ring-slate-200 rounded-xl p-4 bg-white hover:ring-slate-300 transition flex items-center gap-2" href="https://www.twitter.com/combinatoricole" target="_blank">
      {% include social_icon.html name="twitter" %} <span>Twitter</span>
    </a>
    
  </div>
</section>
