---
layout: post
title: "Side effects in Redux"
summary: Cursory look at why side-effects are hard in Redux and some implementations that solve this.
tags: [redux, architecture]
permalink: redux-side-effects
---

# Side effects in Redux

The default model for Redux-like architectures don't have a good mechanism to deal with side-effectful actions (e.g. API calls, I/O operations).
Because of this, these architectures are often "enhanced" to include processes that can detect and perform side-effectful actions, then return the results back into Redux.

This document gives a skin-deep look at the concepts that lead to these enhancements and briefly touches on two practical implementations and their broad tradeoffs: `redux-thunk` and `redux-saga`.

## Structure and determinism

Redux apps broadly have the following structure:

-   A central store holds the state of the application. This state is propagated through to the application's components.
-   Components make up the view/output of the app and configure/render themselves according to that state i.e. they are _driven_ by the state.
-   Components emit actions (events) when the guests of the app interacts with them. These actions can also carry payloads e.g. an action for user input can have the input string as a payload.
-   Events are observed by Redux, which maps the action to a reducer function. The reducer function processes the action and determines how this action should affect the state. The resulting state is given back to Redux, which merges the result into a new version of the application state.

<img src="/assets/redux-structure.png" width="800px" />

For this discussion we can simplify this conceptual model to drop the internal Redux bits.

<img src="/assets/redux-structure-simplified.png" width="800px" />

The central advantage of this structure is that our app can be deterministic: you can be sure of how the application will behave if it's in a certain state. This is a property we want to keep. In fact this is so important that [it is the principal motivation behind Redux](https://redux.js.org/understanding/thinking-in-redux/motivation); if we lost this property, we practically drop the primary advantage for using Redux.

This determinism, however, requires several conditions wich make it difficult to take side-effectful actions:

-   The flow of data from the store to the components needs to be side-effectless - this is necessary in order to ensure that the application will behave deterministically for a given state.
-   The actions emitted from the component are pure objects; there's no opportunity to run a side-effectful process as it currently is.
-   The reducer functions themselves also need to be side-effectless in order for the actions to be deterministic i.e. the result of a reducer will always be the same for a given action and payload.

That doesn't leave much space for us to perform side-effects within Redux's structure.

## Creating a space for side-effects

If we can't work with side-effects within Redux's structure then what if we drive side-effects outside/independent of Redux? This idea is central to the mechanisms we'll be diving into here.

At a conceptual level, we need three things to make this happen:

1. Processes that can run independently of Redux. This is the biggest difference between implementations; we'll discuss ways to do this when we discuss `redux-thunk` and `redux-saga`.
2. A way to trigger these processes from within the Redux app. We already have the concept of actions that components can dispatch that we could expand on i.e. we can define new type of action that can specifically trigger side-effectful processes.
3. A way to feed the results of the processes back into the app. One relatively simple solution for this (and the one we'll assume here) is to use normal Redux actions to deliver the payload back to our app.

<img src="/assets/redux-side-effect-conseptual-structure.png" width="800px">

## Implementations of side-effectful structures

Both libraries we look at here make use of [Redux middleware](https://redux.js.org/understanding/history-and-design/middleware), which allows Redux to be enhanced with new capabilities. This allows the libraries to define when processes should happen within Redux and when they can happen independently.

### [redux-thunk](https://github.com/reduxjs/redux-thunk)

`redux-thunk` allows components can dispatch _functions_ in the same way that they dispatch actions.

Doing this allows side-effectful actions to be differentiated from normal ones (`typeof action === "function" ? sideEffect : normalAction`) and sets up a way to run a process outside of Redux (by just running the function itself).

<img src="/assets/redux-thunk.png" width="800px">

### [redux-saga](https://redux-saga.js.org)

On a simplified level `redux-saga` sets up _listeners_ for normal (aka. Redux-like) actions that you define. Those listeners then trigger functions (technically function _generators_) called "sagas" that define the potentially side-effectful code you want to run for that action.

<img src="/assets/redux-saga.png" width="800px">

### redux-thunk vs redux-saga

> **Disclaimer:** This is not an in-depth comparison. Rather, here we breifly touch on tradeoffs with respect to the broad concepts we've talked about previously. Before making a tech choice on either library I strongly encourage you to read up more broadly and - more importantly - experiment with them yourself to determine whether they meet the criteria of your project(s) and environment.

Superficially both approaches sound very similar: both define functions that get run outside the context of Redux. However, the important difference is _where those functions live_ and _how they get triggered_.

**In `redux-thunk`** the components are aware of the _functions_, which they dispatch themselves. The functions also execute immediately upon dispatch. This allows `redux-thunk` to be incredibly simple and light weight ([it's a total of 14loc](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)). However, this does couple components to the functions they need to dispatch e.g. you can't swap out the function without making a change to the component to dispatch a different function.

**In `redux-saga`** the components know about _actions_, but the _saga_ and the _mapping_ between actions and sagas is set up when redux-saga is set up, which is independent of the component.

Because comonents only emit actions, all the work to determine what to run and when to run it is left to the redux-saga middleware. These responsibilities make redux-saga much heavier than redux-thunk, but they also provide the opportunity to perform optimizations for when and when not to run sagas (e.g. only run a saga for the latest action, not every action).

In addition, since components only emit actions it is possible to change what that action maps to without changing the component and, since these are normal actions, you could decide to respond to that action in a Redux reducer instead of in a saga in the case that the implementation changes and that you no longer need to perform side-effects.

**Personal conclusion:**

-   `redux-thunk` provides a structure that is light-weight both structurallly and conceptually at the cost of extra coupling between components and the effects they trigger. I would personally lean towards this on smaller projects that I don't intend to maintain for long.
-   `redux-saga` provides a clean separation of concerns between effects and components as well as a suite of optimizations that apply to when actions are triggered at the cost of being a heavier middleware both in terms of size and concepts. I would personally default to this for longer running/larger projects.
