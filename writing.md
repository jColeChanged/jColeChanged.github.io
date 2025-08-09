---
title: Writing
layout: default
---

<section class="mt-4">
  <h2 class="h4 mb-3">Writing</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {% for post in site.posts %}
      <article class="ring-1 ring-slate-200 rounded-lg p-4 bg-white hover:ring-slate-300 transition">
        <a class="block font-semibold text-slate-900 hover:text-blue-700" href="{{ post.url }}">{{ post.title }}</a>
        <div class="mt-1 text-sm text-slate-500">{{ post.date | date: "%b %d, %Y" }}</div>
        <p class="mt-2 text-slate-700">{{ post.excerpt | strip_html | truncatewords: 28 }}</p>
      </article>
    {% endfor %}
  </div>
</section>
