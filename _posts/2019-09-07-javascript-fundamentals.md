---
layout: post
title:  'JavaScript scope'
summary: A quick overview of scope in javascript.
tags: [javascript,fundamentals]
permalink: javascript-scope
---

Code should ideally only have access to the resources it needs in order to perform its function. The set of variables/functions/classes that are accessible to a particular line of code what we call the **<span class="tooltip" data-tooltip="also known as 'execution context'">scope</span>** of that line. There are several types of scope in JavaScript which affect where a variable/function/method will be accessible; understanding what they are and how to declare objects into the different contexts is important for working effectively in this language.

**Global scope** allows variables or functions to be accessed from anywhere in the current <span class="tooltip" data-tooltip="a.k.a the runtime environment. This is the overall environment in which the program is being executed. Example runtime environments are the browser or an instance of NodeJS.">execution environment</span>. Objects have gobal scope when they are declared at the top-level of a program i.e. outside of modules/classes/blocks/functions. _- [example on JS Bin](https://jsbin.com/vatabakuxo/1/edit?js,console)_

**Module scope** allows variables or functions declared at the top-level of a module to be accessed from anywhere in that module. To access module-scoped objects outside of a module, they need to be exported from the module then imported into the consuming code.

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

**Function scope** allows variables or functions declared at the top-level of a function to be accessed anywhere in the function. _- [example on JS Bin](https://jsbin.com/bekosax/3/edit?js,console)_

**Block scope** allows variables or functions declared with `let` or `const` at the top-level of a block to be accessed anywhere in the block. Variables declared with `var` are not constrained by blocks i.e. _will leak outside of a block_. _- [example on JS Bin](https://jsbin.com/bekosax/1/edit?js,console)_

**Lexical scope** is built up at the time of "lexing". JavaScript "lexes": it reads an entire source file and builds up a scope with whith all the declaration/assignments that it can resolve before executing the code and trying to figure the rest out dynamically. _Code will access/use any variables in lexical scope before using dynamically defined ones._ _- [example on JS Bin](https://jsbin.com/bekosax/5/edit?js,console)_