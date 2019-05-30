---
layout:   default
title:    Tags
---

{% assign rawtags = "" %}
{% for post in site.posts %}
  {% assign ttags = post.tags | join:'|' | append:'|' %}
  {% assign rawtags = rawtags | append:ttags %}
{% endfor %}

{% assign rawtags = rawtags | split:'|' | sort %}

{% assign tags = "" %}

{% for tag in rawtags %}
  {% if tag != "" %}
    {% if tags == "" %}
      {% assign tags = tag | split:'|' %}
    {% endif %}

    {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}

# {{ page.title }}

_Index of tags across all posts._

{% for tag in tags %}
[[{{ tag }}]](#{{ tag }})<br>
{%- endfor -%}

{% for tag in tags %}
## {{ tag }}
{% for post in site.posts %}
{% if post.tags contains tag %}
 - [{{ post.title }}]({{ post.url }} "{{ post.summary }}")
{% endif %}
{% endfor %}
{% endfor %}
