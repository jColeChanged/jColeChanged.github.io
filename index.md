---
layout: default
---

## Elsewhere On The Internet

In addition to the content I host here on my own domain, I also have works on other websites. If you would like to support my online presence or see other content by me, please follow me on these other platforms.

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

<div class="row">
  <div class="col-sm-6">
    <h2>Writing</h2>
    <ul>
      {% for post in site.posts %}
      <li class="unstyled">
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
      {% endfor %}
    </ul>
  </div>
  <div class="col-sm-6">
    <h2>Tools</h2>
    <p>
      Some minor tools I've made and made publicly available. Nothing special here.
    </p>
    <ul class="list-unstyled">
      <li><a href="/svg2d3.html">SVG To D3.js Compiler</a></li>
    </ul>
  </div>


{% include notifications.html %}