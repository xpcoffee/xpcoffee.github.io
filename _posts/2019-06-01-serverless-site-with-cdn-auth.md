---
layout: post
title:  'Serverless website with CDN Auth'
summary: An architectural pattern for a serverless website that performs authentication and authorization in front of the CDN.
tags: [serverless,pattern,architecture,authentication,authorization,cloud services,distributed systems]
permalink: serverless-website-with-cdn-auth
---

## The general pattern

The idea is to put some <a title="ability to run code">compute</a> in front of your <a title="A website that runs and renders entirely in the browser, as opposed to sites which, traditionally, get rendered on a server and only then are displayed in the browser.">serverless website</a> CDN that has the ability to reject requests before they hit the CDN. This has become possible via offerings like [AWS Lambda@Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) and [CloudFlare Workers](https://www.cloudflare.com/products/cloudflare-workers/).

<a title="determining who made the request">Authentication</a> and <a title="determining whether the person/system that made the request is alllowed to do what they're requesting to do">authorization</a> can be done in the compute, but this is relatively heavy-handed; serverless compute has very limited memory and this extra processing can be computationally expensive (long execution times, so higher costs). Alternatively, the compute can call out to one or more dedicated authentication and authorization servers, then act according to the response.

![](/assets/serverless-site-with-cdn-auth-general.svg)

## Example with AWS

Here are some real-world building blocks:

- [AWS Lambda@Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) for compute.
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/) for theCDN.
- [Amazon Cognito](https://aws.amazon.com/cognito/) for authentication and authorization.
- [Amazon S3 static-website bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) to host the static website & its assets.

The compute and CDN come together, but other than that, you can swap out any component for another equivalent (e.g. you could replace Lambda@Edge and CloudFront with CloudFlare Workers and CDN respectively).

![](/assets/serverless-site-with-cdn-auth-aws.svg)