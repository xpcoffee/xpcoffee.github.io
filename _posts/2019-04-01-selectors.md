# Selectors

Selectors are [pure functions](https://en.wikipedia.org/wiki/Pure_function) that take in state and return a subset and/or transformed view of the state - they "select" part of the store.

Selectors are used to **cheaply decouple your view and state logic** in apps where state is centralized (e.g. React with a central Redux store).

## The problem

Let's look at an example where an app is passing its centralized state to a component.

```javascript
/**
 * Store
 */
Store {
    users: Person[],
    ...
}

Person {
    id: string;
    name: string;
    birthdate: Date;
    address: Address;
    preferences: Preferences;
    connections: Person[];
}

/**
 * App
 */
class App {
    store = constructAndPopulateStoreSomehow();

    constructor(request) {
        this.userId = authenticate(request);
    }

    render() {
        PersonalDetails(this.store, this.userId);
    }
}

/**
 * Component
 */
class PersonalDetails {
    constructor(store, userId) {
        this.userId = userId;
        this.store = store;
    }

    render() {
        user = this.store.users.find(this.userId);
        Card({
            title: "Personal Details",
            fields: [
                Field("Name", user.name),
                Field("Age", now().year - user.birthdate.year),
                Field("Street Address", user.address.street),
                Field("Suburb", user.address.suburb),
                Field("City", user.address.city),
            ]
        })
    }
}
```

This structure has issues:

- The component is relatively tricky to test. You need to render the component and ensure that the displayed data has correctly been transformed. These tests tend to become slow and difficult to maintain as your component increases in complexity.
- The component is hard-coupled to the state. If we decide to change the shape of the state, we'll need to change the state-transformation logic in the component and in the component's tests.

## How selectors make things better

Now let's take a look at pulling out the state logic into a selector.

```javascript
/**
 * Selector
 */
personalDetailsSelector = function(store: Store, userId: string) {
    user = store.users.find(userId);

    // pull out the necessary information from the store
    return {
        name: user.name,
        streetAddress:  user.address.street,
        suburb: user.address.suburb,
        city: user.address.city,
        age: now().year - user.birthdate.year
    }
}

/**
 * App
 */
class App {
    ...

    render() {
        // the selector can now be used to extract only the data that the component needs
        PersonalDetails(personalDetailsSelector(this.store, this.userId));
    }
}

/**
 * Component
 */
class PersonalDetails {
    constructor(params) {
        this.params = params;
    }

    // the component no longer cares about what the state looks like
    render() {
        Card({
            title: "Personal Details",
            fields: [
                Field("Name", this.params.name),
                Field("Age", this.params.age),
                Field("Street Address", this.params.streetAddress),
                Field("Suburb", this.params.suburb),
                Field("City", this.params.city),
            ]
        })
    }
}
```

Here's what we've gained from making this simple change:

- The selector is a pure function, it's very easy to test; you just give it inputs and assert the outputs are what you expect them to be.
- The state logic is now tested in the selector, so the component's tests can be drastically simplified.
- The selector is a pure funciton; it's easy to [memoize](https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19) the output that a particular input gave. Memoizing selector results can noticably improve the performance of your app. See also the [reselect library](https://github.com/reduxjs/reselect).
- The selector is a pure function; it's easy to make changes to it and its corresponding tests when you make changes to your state.

