---
title: 'A niblet of: Throttling'
---

**TLDR;** Throttling is the act of selectively refusing requests to protect a service from being overwhelmed by demand.

## What problem does throttling address?

Services have a critical problem, which arises from combining two facts:

Firstly, **a service must do work for every request made against it**. e.g. a website render a webpage; an API fetches data from a database, filters and transforms it before sending it back. This work requires resources: the CPU works harder, more data is accessed from data-storage devices, etc. This means that there is a limit to the amount of work that a service can perform; there are a finite amount of requests that a service can serve. When a service reaches its limit, bad things happen: the service can misbehave in unexpected ways or crash altogether.

Secondly, **a service has no control over where requests come from**. An internet service is open to anyone that wants to call against them, at any time. So it is possible - and common - for a large amount of requests to hit a service without warning.

When a large amount of requests hit a service unexpectedly, this causes a "load spike" on the service, which can become overwhelmed and crash/become unavailable.

<img src="/assets/niblet-throttling-without-throttling.png" alt="without-throttling">

## How does throttling help?

In practice, events which cause load spikes often have what I'll call a **focus-point** e.g. a user started calling _the bank statement API_ very frequently; a surge in traffic happened when users were linked to _the SpaceCat webpage_ from a popular Reddit post. Focus points allow us to classify problematic load: we can distinguish traffic going to _the SpaceCat webpage_ to traffic going to other pages on the website. Once classified, requests can isolated and limited to prevent the service from being overloaded and to allow other requests to be served normally.

<img src="/assets/niblet-throttling-with-throttling.png" alt="with-throttling">

So, what do we need to do to throttle? We need 4 things:

1. **An axis** - This is another name for a class/category of requests. We'll need an algorithm or mechanism for categorizing requests. Example axes are the a user's account ID; the type of request; the specific API method which the request is calling against; a resource which the request is attempting to access. 
1. **An aggregation** - we need some way of turning requests in an axis into a number that we can set a limit on. We'll need an algorithm for this aggregation. Example aggregations are the number of requests; the amount of results that the requests would return; the total amount of bits that the requests would send back.
1. **A period** over which to perform one aggregation. 
1. **A limit/threshold** to set on the aggregation.

Example: Throttle calls when `user12314` (axis) downloads more than 750MB of data (aggregation and limit) in 10 seconds (period).

<img src="/assets/niblet-throttling-example.png" alt="with-throttling">


## What are the limitations of throttling?

Throttling looses some effectiveness when the axes are badly chosen or if demand hits every axis. In these cases, combining requests across axes could still be more than the service can handle.

## As a user, what do I do when I get throttled?

The standard response for requests which are denied via throttling is [HTTP 429](https://www.httpstatusgoats.net/429), though some services have also been known to return [HTTP 503](https://www.httpstatusgoats.net/503). When receiving a throttling exception, the best thing is to [backoff and retry](https://cloud.google.com/storage/docs/exponential-backoff). This gives the service some time to recover, while still allowing your call to eventually succeed.