---
layout: post
title: 'Method chaining'
summary: Programming style where void methods instead return a reference to the object, allowing another method to be called immediately.
tags: [development,pattern,style]
permalink: method-chaining
---

If you find yourself writing a lot of <span class="tooltip" data-tooltip="Methods that don't return a value">void methods</span>, you can find yourself with code that looks like this:

```typescript
class SandwichDrone {
    flyTo(dest: Destination): void {
        /* ¯\_(ツ)_/¯ */
    }

    /* ... */
}

const sammichMecha = new SandwichDrone();
sammichMecha.flyTo(KITCHEN);
sammichMecha.makeSandwich();
sammichMecha.pickUp(SANDWICH);
sammichMecha.flyTo(COUCH);
sammichMecha.putDown(SANDWICH);
sammichMecha.flyTo(ROOST);
sammichMecha.hibernate();
```

You can neaten things up quite a bit by returning a reference to the object instead of leaving the method void:

```typescript
class SandwichDrone {
    flyTo(dest: Destination): SandwichDrone {
        /* ¯\_(ツ)_/¯ */
        return this; // reference to the object
    }

    /* ... */
}

new SandwichDrone();
    .flyTo(KITCHEN);
    .makeSandwich();
    .pickUp(SANDWICH);
    .flyTo(COUCH);
    .putDown(SANDWICH);
    .flyTo(ROOST);
    .hibernate();
```