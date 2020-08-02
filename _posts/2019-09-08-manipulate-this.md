---
layout: post
title:  'Manipulating this with call, apply and bind'
summary: Ways to specify what the JavaScript **this** keyword points to.
tags: [javascript]
permalink: manipulate-this
---

**The `this` keyword in JavaScript** is a reference to the ThisBinding. <span class="tooltip" data-tooltip="It references the object in which the function is defined if the function is a method; it references the global execution environment if the function is outside an object.">[The ThisBinding is updated dynamically by the interpreter.][this_binding_so]</span>  The ThisBinding can allow functions to have access to scope that is outside of the function closure (e.g. <span class="tooltip" data-tooltip="This ability makes 'this' useful when working within objects. 'this' becomes analogous to what would be called 'private' or 'protected' scope in other languages.">other object attributes</span>).

**The `this` reference can be manipulated** for functions by using their `call`, `apply` and `bind` methods. Knowing how to use these opens up powerful ways to share functionality between classes and objects.

Here's a quick intro for each:

```javascript
/**
 * We define a function with logic that we want to share at runtime.
 */
function greet(name, surname) {
    console.log(`${this.greeting}, ${name} ${surname}! ${this.howAreYou}`);
}

/**
 * We define some objects that can make use of that functionality.
 */
const english = {
    greeting: "Good morning",
    howAreYou: "How are you?"
}

const french = {
    greeting: "Bonjour",
    howAreYou: "Comment allez-vous?"
}

const afrikaans = {
    greeting: "Gooie more",
    howAreYou: "Hoe gaan dit?"
}

/** 
 * call -  Invokes the function directly. 
 * 
 * first param: the object that "this" should refer to
 * params thereafter: function parameters
 */
greet.call(english, "Tom", "Tomsington");

/** 
 * apply - Invokes the method directly. It's very similar to the call method. 
 * 
 * first param: the object that "this" should refer to
 * second param: an array of function parameters
 */
greet.apply(french, ["Stephanie", "de Monaco"])

/** bind - Prepares the function, such that it can be called later. 
 * 
 * first param: the object that "this" should refer to
 * params thereafter: [optional] function parameters. This **partially** populates parameters. Useful when parameters don't change. 
 */
const afrikaansGreeting = greet.bind(afrikaans, "Jaco")

// We can now call with the prepared function with the remaining parameters
afrikaansGreeting("van de Merwe"); 
afrikaansGreeting("van Niekerk");
afrikaansGreeting("van die Spruitriviersfontein");
```

## Practical example using bind

Here we'll look at a situation where manipulating `this` can be useful.

The core idea is that **returning a bound function** allows us to use methods of an object outside of those objects. 

Usually, [closures capture scope which functions need][javascript_scope], but closures do not lock down what `this` refers to. Since `this` is frequently used within object methods, we need a method of binding `this` so that the method can still work even when it is passed around without its object.

```javascript
/** Class returning an unbound function **/
class Passerby {
    constructor(name) {
        this.name = name;
        console.log("Hello! I am " + this.name);
    }

    rememberMe() {
        // return a function making use of "this"
        return function() {
            console.log("I remember " + this.name + "!");
        }
    }
}
const rememberJohn = new Passerby("John").rememberMe();

try {
  /**
   * When we call the function here, the "this" reference has changed:
   * we no longer reference the object; instead we're referencing the 
   * global execution context. There is no "name" in the global context,
   * so an error occurs. 
   */
  rememberJohn();
} catch(e) {
  console.log("I can't quite recall who that was...");
}


/** Class returning a bound function **/
class Friend {
    constructor(name) {
        this.name = name;
        console.log("Hello! I am " + this.name);
    }

    // return a bound function making use of "this"
    rememberMe() {        
        const remember = function() {
            console.log("I remember " + this.name + "!");
        }
        return remember.bind(this);
    }
}

const rememberEmily = new Friend("Emily").rememberMe();

try {
  /**
   * Because the function has been "bound" to our Friend object, 
   * "this" still references "emily", and we can successfully log 
   * out the name 
   */
  rememberEmily();
} catch(e) {
  console.log("I can't quite recall who that was...");
}
```

--- 

## TODO 

* Applying functions to objects you don't control
* Sharing methods with other objects
* Caveats - these methods can be strong vectors for the the [feature envy codesmell](https://blog.codinghorror.com/code-smells/)

[this_binding_so]:https://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
[jsbin_intro]:https://jsbin.com/tipevoj/2/edit?js,console
[jsbin_bound_function]:https://jsbin.com/paburub/1/edit?js,console
[javascript_scope]:/javascript-scope