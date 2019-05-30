---
layout: default
---

<small>This is my site. It's fragile; please treat it gently. =)</small>

<div class="home">
  {%- if site.posts.size > 0 -%}
    <ul class="post-list">
      {%- for post in site.posts -%}
      <li>
        <a class="post-link" href="{{ post.url | relative_url }}" title="{{ post.summary | no summary - I was lazy ¯\_(ツ)_/¯ }}">
          {{ post.title | escape }}
        </a>
        <span class="post-meta">[{{ post.tags | join: "] [" }}]</span>
      </li>
      {%- endfor -%}
    </ul>

    <small><p class="feed-subscribe"><svg class="svg-icon orange"><use xlink:href="{{ '/assets/minima-social-icons.svg#rss' | relative_url }}"></use></svg><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p></small>
  {%- endif -%}

</div>