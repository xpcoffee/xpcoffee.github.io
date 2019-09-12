---
layout: post
title:  'Manipulating this with call, apply and bind'
summary: Ways to specify what the JavaScript **this** keyword points to.
tags: [javascript]
permalink: manipulate-this
---

**The `this` keyword in JavaScript** is a reference to the ThisBinding. <span class="tooltip" data-tooltip="It references the object in which the function is defined if the function is a method; it references the global execution environment if the function is outside an object.">[The ThisBinding is updated dynamically by the interpreter.][this_binding_so]</span>  The ThisBinding can allow functions to have access to scope that is outside of the function closure (e.g. <span class="tooltip" data-tooltip="This ability makes 'this' useful when working within objects. 'this' becomes analogous to what would be called 'private' or 'protected' scope in other languages.">other object attributes</span>).

**The `this` reference can be manipulated** for functions by using their `call`, `apply` and `bind` methods. Knowing how to use these opens up powerful ways to share functionality between classes and objects. _[See this JS Bin for a quick introduction to each][jsbin_intro]_

Here we'll look at some practical uses where manipulating `this` can be useful.

## bind

**Returning a bound function** allows us to execute the function outside of objects as if it were still in the object. 

Usually, [closures capture scope which functions need][javascript_scope], but closures do not lock down what `this` refers to. We need bind when using `this` in functions that we pass around so that its value does not fluctuate as the interpreter changes the ThisBinding.

<p class="codepen" data-height="510" data-theme-id="dark" data-default-tab="js,result" data-user="xpcoffee" data-slug-hash="NWKzdwG" data-preview="true" style="height: 510px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Returning a bound function">
  <span>See the Pen <a href="https://codepen.io/xpcoffee/pen/NWKzdwG/">
  Returning a bound function</a> by Rick Bosch (<a href="https://codepen.io/xpcoffee">@xpcoffee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

--- 

## TODO 
* applying functions to objects you don't control
* sharing methods with other objects
* caveats - these methods can be strong vectors for the the [feature envy codesmell](https://blog.codinghorror.com/code-smells/)

[this_binding_so]:https://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
[jsbin_intro]:https://jsbin.com/tipevoj/2/edit?js,console
[jsbin_bound_function]:https://jsbin.com/paburub/1/edit?js,console
[javascript_scope]:/javascript-scope