**TLDR;** Throttling is the act of selectively refusing requests to protect a service from being overwhelmed by demand.

## What problem does throttling address?

Services have a critical problem, which arises from combining two facts:

Firstly, *a service must do work for every request made against it*. e.g. a website render a webpage; an API fetches data from a database, filters and transforms it before sending it back. This work requires resources: the CPU works harder, more data is accessed from data-storage devices, etc. This means that there is a limit to the amount of work that a service can perform; there are a finite amount of requests that a service can serve. When a service reaches its limit, bad things happen: the service can misbehave in unexpected ways or crash altogether.

Secondly, *a service has no control over where requests come from*. An internet service is open to anyone that wants to call against them, at any time. So it is possible - and common - for a large amount of requests to hit a service without warning.

When a large amount of requests hit a service unexpectedly, the service can become overwhelmed and crash/become unavailable.

## How does throttling help?

In practice unexpected increases in load are often caused by single events, which have specific characteristics e.g. another system starts calling a _specific API_ very frequently; many people are linked to a _specific webpage_ from a popular post. This means that the problematic load can often be classified, and that can be exploited to protect the service: if you can find a way of grouping the problematic requests together, you can set a limit to how many of them the service should accept so that your service doesn't crash from an unexpected surge of requests. 

This is **throttling**: a strategy where you classify requests and choose drop requests classes which have too many requests so that the service stays operational. This allows services to serve *some* problematic requests and *most/all* of the requests which fall outside the problematic group.

## How does throttling work?

To throttle, you need 4 things:

1. Some way of categorizing requests. The category is sometimes called a throttling "*axis*". There's no one way to do this, these depend on the service. Example axes are the account-number of the request; the type of request; specific API method which the request is calling against. 
2. Some way of *aggregating* the requests in an axis. Again, there's no one way to do this. Example aggregations are the number of requests; the amount of results that the requests would return; the total amount of bits that the requests would send back.
3. *A period* for one aggregation. 
4. *A limit/threshold*.

When the *aggregation* for an *axis* crosses the *threshold* for a *time period*, the service denies requests for that axis until the aggregation drops back below the threshold. Every request that hits the service triggers the calculation and check against the threshold. In larger systems, with hundreds of axes and aggregations, a dedicated system can handle throttling exclusively.

## When does throttling not help?

Throttling looses some effectiveness when the axes are badly chosen or if demand hits every axis. In these cases, combining requests across axes could still be more than the service can handle.

## As a user, what do I do when I get throttled?

The standard response for requests which are denied via throttling is [HTTP 429](https://www.httpstatusgoats.net/429), though some services have also been known to return [HTTP 503](https://www.httpstatusgoats.net/503). When receiving a throttling exception, the best thing is to [backoff and retry](https://cloud.google.com/storage/docs/exponential-backoff). This gives the service some time to recover, while still allowing your call to eventually succeed.