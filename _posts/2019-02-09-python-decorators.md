---
layout: post
title: "Python Decorators"
summary: Decorators offer a way to re-use functionality via composition. Here's a step-by-step introduction to them in Python.
tags: [python,pattern,development,reusability]
permalink: python-decorators
---

Decorators are one of many ways to pull out and re-use common functionality. In particular, they allow you to wrap functionality.

![](/assets/decorator-burger.svg)


## A logging example

Without a decorator:

```python
def do_the_thing():
    print('[SAFE] pre')
    # logic
    print('[SAFE] post')
 
def undo_the_thing():
    print('[MAY CAUSE IMPACT] pre')
    # logic
    print('[MAY CAUSE IMPACT] post')
```

With a decorator:

```python
# <define @with_logging>
# I'll explain how to do this later
 
@with_logging('SAFE')
def do_the_thing():
    #logic
 
@with_logging('MAY CAUSE IMPACT')
def undo_the_thing():
    #logic
```

Complete example

```python
def with_logging(risk):
    def decorate_function(fn):
        def call_with_logging(*fn_args, **fn_kwargs):
            print('[{0}] pre'.format(risk))
 
            fn_result = fn(*fn_args, **fn_kwargs)
 
            print('[{0}] pre'.format(risk))
            return fn_result
        return call_with_logging
    return decorate_function
 
@with_logging('SAFE') 
def do_the_thing(manner):
    print('This is a safe operation. Doing the thing {0}'.format(manner))
 
@with_logging('MAY CAUSE IMPACT') 
def undo_the_thing():
    print('This may cause impact. Undoing the thing {0}'.format(manner))
 
do_the_thing('quickly')

undo_the_thing('carefully')
```
```
# output
[SAFE] pre
This is a safe operation. Doing the thing quickly
[SAFE] post
[MAY CAUSE IMPACT] pre
This may cause impact. Undoing the thing carefully
[MAY CAUSE IMPACT] post
```

## Step by step
Let’s run through the thought process that gets us to the complete example.

### Wrap the function call
We have a function:

```python
def do_the_thing(manner):
    print('Doing the thing {0}'.format(manner))
```

In order to change the behaviour of a function before and after the function’s logic, we can define another function that wraps calls to our initial function:

```python
# wrap a given function - take in the arguments you need to call that function
def call_with_logging(fn, *fn_args, **fn_kwargs):
    print('pre')
    fn(*fn_args, **fn_kwargs)
    print('post')
 
# call our function using the wrapper
call_with_logging(do_the_thing, 'well')
```
```
# output
pre
Doing the thing well
post
```

It works! We now have a way re-using our pre- and post-function logic.

### Wrap the function definition

Looking at the above implementation, we have usability problem. It’d be a pain to have to wrap our function calls with call_with_logging everywhere in our code-base.

Instead of wrapping the function when calling, lets wrap the function definition:

```python
# define a function that can decorate another function
def decorate(fn):
    # define a new function that wraps our original function
    def decorated_function(*fn_args, **fn_kwargs):
        print('pre')
        fn(*fn_args, **fn_kwargs)
        print('post')
 
    # return our new, decorated function
    return decorated_function
 
# define the function containing our logic
def do_the_thing(manner):
    print('Doing the thing {0}'.format(manner))
 
# decorate and call our function
decorated_fn = decorate(do_the_thing)
decorated_fn('well')
```
```
# output
pre
Doing the thing well
post
```

That’s a bit better; calls to our decorated function are significantly cleaner.

### Annotations

So far so good, however, it’s unfortunate that our current implementation doesn’t use our original function name when calling. Luckily, we can get this behaviour – with very little work – by using annotations.

Annotations have the form @function_name and are placed above a function definition. In our case, it looks like this:

```python
# change our function definition have @decorate
@decorate
def do_the_thing(manner):
    print('Doing the thing {0}'.format(manner))
```

Now that we have annotated our function, we can call it directly and the annotation will apply our decorator to the function.

```python
do_the_thing('well')
```
```
# output
pre
Doing the thing well
post
```

So what’s going on?
`@decorate` does a little bit of magic. It will call the decorate function and replace do_the_thing with the result. When we call do the thing, we are actually doing the following:

```python
decorate(do_the_thing)('well')
```

### Annotation parameters

What if we want our decorations to take in parameters? In this case – how could we change the format of the message, depending on the function we are calling?

It turns out that annotations support parameters. Pay attention here – this can be a bit confusing:

As mentioned above, @decorate maps to decorate(fn).
`@decorate(decorator_arg)` maps to `decorate(decorator_arg)(fn)`.
This means we need another function definition in our decorator in order to handle these arguments.

```python
# handle decorator arguments at the top level
def with_logging(risk):
    def decorate_function(fn):
        def wrap_function_call(*fn_args, **fn_kwargs):
            print('[{0}] pre'.format(risk))
            fn_result = fn(*fn_args, **fn_kwargs)
            print('[{0}] pre'.format(risk))
            return fn_result
        return wrap_function_call
    return decorate_function
 
@with_logging('SAFE') 
def do_the_thing(manner):
    print('Doing the thing {0}'.format(manner))
 
do_the_thing('well')
```
```
# output
[SAFE] pre
Doing the thing well
[SAFE] post
```

That’s it! You can now decorate your functions with wild abandon.

> *This was [originially posted on Wordpress](https://xpcoffee.wordpress.com/2017/09/23/python-decorators/); but it lives here now.*
