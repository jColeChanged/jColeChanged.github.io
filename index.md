---
title: Index
layout: default
---

## About Me

Generalist Software Engineer | AI & Machine Learning Expert | Founder of [TackTech](https://tacktech.ai).

Welcome to my blog.  I'm Joshua Cole, CEO of TackTech, an AI startup providing [personalized AI](https://tacktech.ai).

I spend most of my time thinking about software engineering, artificial intelligence, game theory, and machine learning problems.  I sometimes write about my thoughts on this blog.  Often I do it to avoid repeating myself.  

I also enjoy writing and competitive gaming in my spare time.

## Writing

{% for post in site.posts %}
<p>
  <strong>{{ post.date | date: "%B %d, %Y" }}:</strong> <a href="{{ post.url }}">{{ post.title }}</a><br>
  {{ post.content | strip_html | truncatewords: 50 }}
</p>
{% endfor %}


## Tools

Some minor tools I've made and made publicly available. Nothing special here.

 - [SVG To D3.js Compiler](/svg2d3.html)

## Elsewhere On The Internet

In addition to the content I host here on my own domain, I also have works on other websites. If you would like to support my online presence or see other content by me, please follow me on these other platforms.

- [TackTech](https://tacktech.ai/)

- [Patreon](https://www.patreon.com/toojoshua)

- [Twitch](https://www.twitch.tv/toojoshua)

- [YouTube](https://youtube.com/jcolechanged)

- [fanfiction.net](https://www.fanfiction.net/~toojoshua)

- [SpaceBattles](https://forums.spacebattles.com/members/toojoshua.315351/)

- [Twitter](https://www.twitter.com/jcolechanged)

- [Quora](https://www.quora.com/profile/Joshua-Cole-185)

- [Reddit](https://www.reddit.com/u/jcolechanged)

- [Hacker News](https://news.ycombinator.com/user?id=JoshCole)

- [GitHub](https://www.github.com/jcolechanged)

{% include notifications.html %}
