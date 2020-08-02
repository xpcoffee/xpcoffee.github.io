---
layout: post
title:  'Scope in JavaScript'
summary: A quick overview of scope in javascript.
tags: [javascript]
permalink: javascript-scope
---

Many bugs in programming arise from a misunderstanding of how scope is structured and how it can change. This page is a quick reference to help keep maintain a decent understanding of scope in JavaScript.

**Scope** is the "stuff" that's available to a line of code at the time it gets executed. It encompasses what that it can access (available variables/references), and what it can do (the functions it can call and how it's allowed to call them). Another name for scope could be the "execution context" of a specific line of code.


## References

JavaScript access values through **references** (a.k.a. pointers in other languages).

```javascript
const person = { age: 20 }; // create a reference to a person object

const ageSnapshot = person.age; 
/**
 * Three main steps happen:
 * 
 * 1. Look up "person" reference, get the value it points to (resolve the reference). Let's call that value "PersonValue".
 * 2. On the object "PersonValue", look up the reference for "age", resolve the reference to it's value. Let's call that value "AgeValue".
 * 3. Assign "AgeValue" to the "ageSnapshot" variable.
 */
 

person.age = 21; 
/**
 * 4 main steps happen:
 * 
 * 1. Create a new value 21, let's call it "NewAgeValue"
 * 2. Look up "person" reference, get the value it points to (resolve the reference). Let's call that value "PersonValue".
 * 3. On the object "PersonValue", look up the reference for "age". Let's call that reference "AgeReference".
 * 3. Assign "NewAgeValue" to the "AgeReference" reference.
 */

console.log(person.age);
// => 21
/*
 * We resolve the references for person.age, which point to the "NewAgeValue" we set above, whose value is 21.
 */

console.log(ageSnapshot);
// => 20
/*
 * We resolve the ageSnapshot reference, which points to the original value of age, which is 21. 
 * The ageSnapshot reference is independent of the person.age reference. Changing one doesn't change the other.
 */
```


## Types of scope in JavaScript

|global| Global scope is accessible from the entire execution environment (e.g. webpage or NodeJS instance). Objects have gobal scope when they are declared at the root level of a program i.e. outside of modules/classes/blocks/functions. |
|module| Module scope is accessible anywhere in a [JavaScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). To access module-scoped objects outside of a module, they need to be exported from the module then imported into the consuming code. |
|function| References with function scope are declared within functions. They are accessible anywhere within that function, irrespective of where that function is called from. |
|block| Block scope is confined by a JavaScript block `{}`. |

```javascript
/* main.js */
// Scope type: global scope
const numbers = [1,2,3,4,5];

const multiply = require("product.js").multiply;

for(let number in numbers) {
    // Scope type: block scope
    const factor = multiply(number);
    console.log(factor);
}
```

```javascript
/* product.js */

// Scope type: module scope
const MULTIPLIER = 10;

function multiply(number) {
    // Scope type: function scope
    return number * MULTIPLIER;
}

export { multiply };
```



### Variable declaration with block scope

`let` and `const` are confined by block scope. `var` is not confined by block scope.

```javascript
{
    var myVar = "foo";
    const myConst = "bar";
    let myLet = "baz";
    console.log("var: " + myVar, "const: " + myConst, "let: " + myLet);
    // => var: foo const: bar let: baz
}

console.log("var: " + myVar) // var leaks out of the block
// => foo
console.log("const " + myConst); // not accessible outside of block
// => ReferenceError
console.log("let " + myLet);  // not accessible outside of block
// => ReferenceError
```

This is important to consider when dealing with loops because loop iteration variables get defined in a block. Using `var` will cause the **same object** to persist across iterations. Using `let` will create a new instance for every loop.


## Lexical scoping

It's possible to nest scopes in JavaScript. With the idea of nesting scope comes the idea of **lexical scoping**, where a reference defined in a scope is available in that scope and all scopes that are nested within that scope.

This happens through "scope chaining". When a scope tries to find a reference it will first try to look for it in its current scope. If the reference cannot be found in the current scope, it will try to look into the parent scope to find it. If it can't be found there, it will look into *that* scope's parent scope. This continues until the reference is found or until the outermost (a.k.a. "global") scope is reached. If a reference can't be found in this "chain" of scopes, a `ReferenceError` will be thrown.

You can think of it of trying to find references "upwards", towards global scope.

```javascript
/* Global scope */
const inGlobalScope = "foo";

(function createAFunctionScope() { /* Scope change: defining a new funciton scope */
    const inFunctionScope = "bar";

    console.log(inGlobalScope);   // found in the global scope
    // => foo
    console.log(inFunctionScope);   // found in the current scope
    // => baz

    { /* Scope change: defining a new block scope */

        const inBlockScope = "baz";

        console.log(inGlobalScope);   // found in the global scope
        // => foo
        console.log(inFunctionScope);  // will find "foo" in the parent scope
        // => bar
        console.log(inBlockScope);  // found in the current scope
        // => baz
    }

    /* Scope change: no longer in block scope, back in the function scope */
    console.log(inGlobalScope);   // found in the global scope
    // => foo
    console.log(inFunctionScope);   // found in the current scope
    // => bar
    console.log(inBlockScope);  // not in current scope or any of the parent scopes
    // => ReferenceError
})();
```

## Closure

Functions can be used in a different context than the context they were declared in. In their original context, a function may have had access to constants or other functions that were defined outside of the function (i.e. in the function's parent scopes). For the function to work as expected, it's necessary to take a snapshot of scope at the time that the function is defined that the function can reference when it gets called in another context.

A "snapshot" of scope is called a **closure** and the verb we use for "creating a closure is to **close** e.g. We "close" over a function to preserve references to variables that are outside of the function.


```javascript
// Function that creates another function
function buildErrorLogFunction() {
    const errorPrefix = "[ERROR] "; // Note that this variable is defined outside of the fn function.

    return function fn(msg) {
        // errorPrefix is copied into fn's closure so that it's available when logError gets called.
        console.log(errorPrefix + msg); 
    }
}

const logError = buildErrorLogFunction();
logError("This is fine.");
// => [ERROR] This is fine.
```

It's important to note that a closure can be created for other cases than when a function is defined. Any time we snapshot scope for use in a different context, we're creating a closure. 