---
layout: post
title: 'Method chaining'
date: 2019-05-26 23:00:00 +0200
summary: Programming style where void methods instead return a reference to the object, allowing another method to be called immediately.
tags: [development,pattern,style]
---

If you find yourself writing a lot of <a title="Methods with no return signature">void</a> methods, you can find yourself with code that looks like this:

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