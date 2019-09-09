---
layout: post
title:  'Manipulating this with call, apply and bind'
summary: Ways to specify what the JavaScript **this** keyword points to.
tags: [javascript]
permalink: manipulate-this
---

**The `this` keyword in JavaScript** allows functions to have a <span class="tooltip" data-tooltip="This is key for dynamically adding functionality to objects.">runtime reference</span> to an object; by default this is their containing object.

**The `this` reference can be manipulated** for function objects by using the `call`, `apply` and `bind` methods. Knowing how to use these opens up powerful ways to share functionality between classes and objects. 

> **_[See this JS Bin for a quick introduction to each](https://jsbin.com/tipevoj/2/edit?js,console)_**

--- 

## TODO 
* some useful examples using apply bind
* caveats - these methods can be strong vectors for the the [feature envy codesmell](https://blog.codinghorror.com/code-smells/)