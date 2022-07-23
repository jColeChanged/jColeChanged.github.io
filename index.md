---
layout: default
---

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

  <div class="col-sm-6">
    <h2>Elsewhere On The Internet</h2>
    <p>
      In addition to the content I host here on my own domain, I also have works
      on other websites. If you would like to support my online presence
      or see other content by me, please follow me on these other platforms.
    </p>
    <ul class="list-unstyled">
      <li>
	<a href="https://www.patreon.com/toojoshua">Patreon</a>
      </li>
      
      <li>
	<a href="https://www.twitch.tv/toojoshua">Twitch</a>
      </li>

      <li>
	<a href="https://youtube.com/jcolechanged">YouTube</a>
      </li>

      <li>
	<a href="https://www.fanfiction.net/~toojoshua">fanfiction.net</a>
      </li>

      <li>
	<a href="https://forums.spacebattles.com/members/toojoshua.315351/">SpaceBattles</a>
      </li>
      
      <li><a href="https://www.twitter.com/jcolechanged">Twitter</a></li>
      <li><a href="https://www.quora.com/profile/Joshua-Cole-185">Quora</a></li>
      <li><a href="https://www.reddit.com/u/jcolechanged">Reddit</a></li>
      <li><a href="https://news.ycombinator.com/user?id=JoshCole">Hacker News</a></li>
      <li><a href="https://www.github.com/jcolechanged">GitHub</a></li>
    </p>
  </div>  
</div>

