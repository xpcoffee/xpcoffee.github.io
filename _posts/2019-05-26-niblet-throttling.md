---
layout: post
title:  'A niblet - Request throttling'
date:   2019-05-26 23:00:00 +0200
categories: service system resiliency throttling rate-limiting retry
summary: Request throttling is the act of selectively refusing requests to protect a system from being overwhelmed by demand.
---

**TLDR;** API/request/service `throttling` (a.k.a `rate limiting`) is the act of selectively refusing requests to protect a service from being overwhelmed by demand.

## Service overload

There are 2 core ideas to consider when thinking about a service's ability to serve requests:

1. > A service must do work for every request made against it

    A website must render a webpage; an API must fetch data from a database, then filter and transform it before sending it back. This work requires resources: the CPU works harder, more data is accessed from data-storage devices, etc. This means that there amount of requests that a service can serve. When a service reaches its limit, it can behave unexpectedly (which is almost always a bad thing) or crash altogether.
2. > A service has no control over where requests come from
   
    An internet service is open to anyone that wants to call against them, at any time. So it is possible - and common - for a large amount of requests to hit a service without warning.

A spike in demand against the service will often cause a spike in the resource usage/load on the service. These spikes can occur at any time and - if the service is not prepared or protected - the resulting "load spike" on the service can overwhelm and take down the service.

<img src="/assets/niblet-throttling-without-throttling.png" alt="without-throttling">

## Selectively shedding load

In practice, events which cause load spikes often have what I'll call a `focus point` e.g. a load spike event was caused when users were linked to the [prancing piglet][piglet] page from a popular Reddit post. Focus points allow us to classify problematic load: we can distinguish traffic going to [prancing piglet][piglet] page from traffic going to other pages on the website. Once classified, we can limit the amount of requests we serve for a particular class, hopefully preventing the service from being overloaded.

[piglet]: https://imgur.com/gallery/FsKMWiJ
<img src="/assets/niblet-throttling-with-throttling.png" alt="with-throttling">

So, what do we need to do to throttle? We need 4 things:

1. **An axis** - This is another name for a class/category of requests. We'll need an algorithm or mechanism for categorizing requests. Example axes are the a user's account ID; the type of request; the specific API method which the request is calling against; a resource which the request is attempting to access. 
2. **An aggregation** - we need some way of turning requests in an axis into a number that we can set a limit on. We'll need an algorithm for this aggregation. Example aggregations are the number of requests; the amount of results that the requests would return; the total amount of bits that the requests would send back.
3. **A period** over which to perform one aggregation. 
4. **A limit/threshold** to set on the aggregation.

`Example:` We decide to throttle calls when user12314 (axis) downloads more than 750MB of data (aggregation and limit) in 10 seconds (period).

<img src="/assets/niblet-throttling-example.png" alt="with-throttling">


## Limitations

Throttling looses some effectiveness when the axes are badly chosen or if demand hits every axis equally or at random. In these cases, the combination of requests being served across axes could still cause more load than the service can handle.

## From the other perspective

We've looked at throttling from the service's side. Let's take a quick look at it from the user's side.

**How do I know I've been throttled?** The standard response for requests which are denied via throttling is [HTTP 429](https://www.httpstatusgoats.net/429), though some services have also been known to return [HTTP 503](https://www.httpstatusgoats.net/503). 

**What do I do with a throttled response?** When receiving a throttling exception, the best thing is to wait - to give the service some time to recover - then retry the same request. This is called `backoff and retry`. There are multiple ways to do this, but a good general-purpose algorithm is [exponential backoff and retry](https://cloud.google.com/storage/docs/exponential-backoff).

## Still hungry for more on the topic?

 - Article: [Go full throttle: The essentials of throttling in your application architecture](https://developer.ibm.com/articles/mw-1705-phillips/) - A more in-depth introduction to throttling.
 - Video: [Approaches for application request throttling](https://www.youtube.com/watch?v=Q53eR7mFsRo) - Conference talk iteratively implementing a throttling solution.
 - Video: [Cloud Patterns for Resiliency (Circuit Breakers and Throttling)](https://youtu.be/yVnVY2HPVsI?t=1409) - Conference talk explaining throttling from cloud-services.