---
layout: post
title:  "Selectors"
date:   2019-04-01 17:00:00 +0200
summary: In systems with centralized state, selectors are pure functions that deal with filtering and transforming data so that components don't have to.
tags: [pattern,react,development,separation of concerns]
---

Selectors are [pure functions](https://en.wikipedia.org/wiki/Pure_function) that filter and transform data from a central state/store  - i.e. they "select" part of the store. They are used to cheaply separate the concern of preparing the data for use by a component and the core concern of the component e.g. in a React app, the components are concerned with representing a view.

![](/assets/selectors.svg)

A selectors could be thought of as a functional [adapter](https://sourcemaking.com/design_patterns/adapter) between the state and a component.

You get some nice properties by doing things this way:

 - The selector can be [memoized](https://stackoverflow.com/a/6469470), which can result in some significant performance enhancements
 - Pure functions are generally straight forward to test
 - The component becomes agnostic to the structure of the central state. It is given only the data it needs to work with.