---
layout: default
---

<small>This is my site. Please treat it gently. ❤</small>

<div class="home">
{%- if site.posts.size > 0 -%}

<h2>Notes and thoughts</h2>
<ul class="no-list">
{% assign sortedposts = site.posts | sort: 'title' %}
{%- for post in sortedposts -%}
<li class="margin-top">
<a class="large-text" href="{{ post.url | relative_url }}" title="{{ post.summary }}">
{{ post.title | escape }}
</a>
<span class="post-meta"> • {{ post.tags | join: ", " }}</span>
</li>
{%- endfor -%}
</ul>

    <small><p class="feed-subscribe"><svg class="svg-icon orange"><use xlink:href="{{ '/assets/minima-social-icons.svg#rss' | relative_url }}"></use></svg><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p></small>

{%- endif -%}

</div>
