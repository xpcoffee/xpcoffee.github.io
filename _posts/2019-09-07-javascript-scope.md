---
layout: post
title:  'JavaScript scope'
summary: A quick overview of scope in javascript.
tags: [javascript]
permalink: javascript-scope
---

Getting scope wrong is a source of a _lot_ of issues in JavaScript. This is a (non-exhaustive) cheatsheet with some of the key aspects.

## Lexical scoping

JavaScript is lexically scoped: <span class="tooltip" data-tooltip="This is important. Scope accesses references to functions or objects, not the objects or functions themselves.">**references to variables or functions**</span> are accessible to the scope in which they are define <span class="tooltip" data-tooltip="JavaScript does 'scope chaining': if a reference cannot be found in the current scope, it will try to look in the parent scope to find it. This continues until the outermost scope is reached.">**and all nested scopes**. 

```javascript

function createAFunctionScope() {
    /* we're in a function scope */

    // we declare a variable in this function scope
    // so the variable can be referenced from this function scope
    let foo = "foo"; 
}
```

## Types of scope

**Global scope** is accessible from the entire <span class="tooltip" data-tooltip="browser/browser tab or an instance of NodeJS.">execution environment</span>. Objects have gobal scope when they are declared at the top-level of a program i.e. outside of modules/classes/blocks/functions. _- [example on JS Bin](https://jsbin.com/cedewo/1/edit?js,console)_

**Module scope** is accessible anywhere in that module. To access module-scoped objects outside of a module, they need to be exported from the module then imported into the consuming code.

```javascript
/* usefulModule.js */
const SOME_MODULE_CONSTANT = "foo";
const internalConstant = "bar"; // this isn't exported; it can't be accessed outside the module
function doSomethingUseful() {
    /* ... */
}

export { doSomethingUseful, SOME_MODULE_CONSTANT };
```

```javascript
/* app.js */
import { doSomethingUseful, SOME_MODULE_CONSTANT } from "usefulModule";
// We can now use the imported objects.
```

**Function scope** is accessible anywhere in the function. _- [example on JS Bin](https://jsbin.com/bekosax/9/edit?js,console)_

**Block scope** is accessible in a <span class="tooltip" data-tooltip="{}">block</span>. `let` and `const` declare into block scope. This means that whenever that block is run, <span class="tooltip" data-tooltip="This makes a big difference in loops/iterations.">a new variable will be created</span>. _`var` will leak outside of a block_. _- [example on JS Bin](https://jsbin.com/bekosax/12/edit?js,console)_

## Closure

A closure is a construct that _preserves scope_. We can "close" over a function to preserve references to variables that are outside of the function. _- [example on JS Bin](https://jsbin.com/ruqilop/3/edit?js,console)_