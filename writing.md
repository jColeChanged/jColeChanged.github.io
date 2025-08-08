---
title: Writing
layout: default
---

<div class="writing-section">
<h2>Writing</h2>

{% for post in site.posts %}
<div class="writing-post">
  <strong>{{ post.date | date: "%B %d, %Y" }}:</strong> <a href="{{ post.url }}">{{ post.title }}</a><br>
  {{ post.content | strip_html | truncatewords: 50 }}
</div>
{% endfor %}
</div>
