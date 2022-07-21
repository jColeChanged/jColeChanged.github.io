---
layout: post
title: Toward Better Tests
published: true
---

<div class="epigraph">
    <blockquote> 
<p>
It is not only the violin that shapes the violinist, we are all 
<a href="#tools_shape" id="quote" rel="footnote">shaped by the tools</a> we train ourselves to use, and in this respect
programming languages have a devious influence: they shape our
thinking habits.
</p>

<footer>
<p>
Edsger W. Dijkstra
</p>
</footer>
</blockquote>
</div>

In order to do testing well it is important to have tools that enable
good practice. This post uses Python to introduce stochastic property
testing, but the general idea is applicable beyond Python and even
beyond programming. I hope in reading this you receive or are inspired
to find an instrument which will help you to build more 
<a href="#reliable" id="introduction" rel="footnote">reliable</a> 
<a href="#software" rel="footnote">software</a>.

What a test *does* is assert something about a program. Lets assume we
have a function that checks to see if the result of an addition function
is always positive. While trying to do so, it could `assert` that the
sum of `1` and `2` is greater than `0`.


``` python
def add(a, b):
    return a + b

# Unparameterized test

def test_sum_positive():
   assert add(1, 2) > 0

try:
    test_sum_positive()
    print("The test passed.")
except AssertionError:
    print("The test failed.")
```

    The test passed!

What a test *is* is a measurement of program execution under specific
conditions. Since a test is a measurement, it follows that it is a
[statistic](https://en.wikipedia.org/wiki/Statistic). So reallly, every
set of tests is a sampling from the population of possible program
executions.

Seeing tests through the lens of statistics is useful, because one of
the things statistics does is draw attention to the importance of good
sampling. A hardcoded unit test might not seem like a problem, since any
test at all is better than none. Statistics reminds us that [this type
of sampling is flawed](https://en.wikipedia.org/wiki/Sampling_bias) such
that we can't necessarily generalize from the sample population to the
actual population.

The measurement of `add(1, 2)` does not give much confidence that the
addition function always returns positive results. The sampling of the
add function isn't even close to being representative of the population
of possible program executions.

For the single addition test above, the test would pass. Despite this,
there are many possible ways that the addition function could be called
so as to fail to produce a positive number. The most obvious cases are
when it's arguments aren't positive numbers, but there are 
<a href="#others" rel="footnote" id="tutorial">others</a>.

One thing we know from statistics is that larger sample sizes are better
than smaller sample sizes. Can we write our tests to include more
samples, to help make our sample more represenative of all the possible
ways the program could be executed?

We can. It is possible to write a hundred variants of the add testing
function.


``` python
def add(a, b):
    return a + b

# An example of a bunch of unparameterized tests

skip = 3
a_few = 99

def test_sum_positive_1():
   assert add(1, 2) > 0

def test_sum_positive_2():
   assert add(skip, a_few) > 0

# ... snip

def test_sum_positive_3():
   assert add(99, 100) > 0

try:
    test_sum_positive_1()
    test_sum_positive_2()
    # ... snip
    test_sum_positive_3()
    print("The tests passed!")
except AssertionError:
    print("A test failed.")
```

Even though we can do this, we shouldn't.

Most functions take arguments. Even basic functions like the addition
function can take arguments: the numbers to add together. Test functions
can take arguments just like other functions can. Instead of hard coding
`1` and `2` a test could be written which asserts that `a` plus `b` is
positive.

This type of test, a test which accepts arguments, is called a
parameterized test. An advantage that a parameterized test has over an
unparameterized test is that by passing a parameterized test different
sets of arguments, it's possible to more concisely measure our program
execution properties.


``` python
def add(a, b):
    return a + b

skip = 3
a_few = 99

# An example of a bunch of tests, using paramaterized tests

def test_paramaterized_sum_positive(a, b):
    assert add(a, b) > 0

def paramaterized_test_runner():   
    test_paramaterized_sum_positive(1, 2)
    test_paramaterized_sum_positive(skip, a_few)
    # ... snip
    test_paramaterized_sum_positive(99, 100)

try:
    paramaterized_test_runner()
    print("The tests passed!")
except AssertionError:
    print("A test failed.")
```


In the case of the sum testing function, this approach only saves about
a line per measurement, because the test is relatively small. There are
many tests which are longer than this. So consider a testing function
that had ten lines of code, instead of only two.

With an unparameterized test, if we were to take one hundred samples
from the space of possible program executions, we would need to
introduce a thousand lines worth of potential errors. Meanwhile, in the
case of parameterized tests, we only need to risk about a hundred and
ten lines worth of potential errors. This savings of nearly nine hundred
potential sources of error is considerable. By this metric,
parameterized tests are exceedingly better than unparameterized tests.

  -----------|------------|-------|--------------------|---------------------
  Function   |Argument    |\#     | Lines for          | Lines for
  Length     |Length      |Tests  | Paramterized Tests | Unparamterized Tests
  -----------|------------|-------|--------------------|--------------------
  2          | 1          | 100   | 102                | 200
  10         | 1          | 100   | 110                | 1000

Parameterized tests are supported in most popular testing frameworks.
For example, `pytest` provides a higher-order function that accepts
argument sets and a parameterized test and returns a test which tests
every test variation.

## [Installing Pytest](#installing-pytest)

Before I can show what parameterized tests look like in `pytest`, we
need to install `pytest` and set it up to work in an ipython notebook.

First, find the Python installation we're using to run Jupyter.

``` python
import sys
sys.executable
```

    '/usr/bin/python3'

Next, install the dependencies we need into the environment.

``` python
! /usr/bin/python3 -m pip install pytest ipython-pytest
```

    Requirement already satisfied: pytest in /usr/local/lib/python3.6/dist-packages (3.6.4)
    Requirement already satisfied: ipython-pytest in /usr/local/lib/python3.6/dist-packages (0.0.1)
    Requirement already satisfied: atomicwrites>=1.0 in /usr/local/lib/python3.6/dist-packages (from pytest) (1.3.0)
    Requirement already satisfied: attrs>=17.4.0 in /usr/local/lib/python3.6/dist-packages (from pytest) (19.1.0)
    Requirement already satisfied: pluggy<0.8,>=0.5 in /usr/local/lib/python3.6/dist-packages (from pytest) (0.7.1)
    Requirement already satisfied: more-itertools>=4.0.0 in /usr/local/lib/python3.6/dist-packages (from pytest) (7.0.0)
    Requirement already satisfied: six>=1.10.0 in /usr/local/lib/python3.6/dist-packages (from pytest) (1.11.0)
    Requirement already satisfied: py>=1.5.0 in /usr/local/lib/python3.6/dist-packages (from pytest) (1.8.0)
    Requirement already satisfied: setuptools in /usr/local/lib/python3.6/dist-packages (from pytest) (40.9.0)


Finally, tell ipython to load the `ipython_pytest` extension.

``` python
%load_ext ipython_pytest
```

Now with `pytest` installed, we can use it to write some parameterized
tests.


``` python
%%pytest

# Parameterized test, with pytest
import pytest


def add(a, b):
    return a + b

skip = 3
a_few = 99


@pytest.mark.parametrize('a, b', [
  (1, 2),
  (skip, a_few),
  # ...
  (99, 100),
])
def test_sum_positive(a, b):
   assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpuliw3v4m, inifile:
    plugins: hypothesis-4.15.0
    collected 3 items

    _ipytesttmp.py ...                                                       [100%]

    =========================== 3 passed in 0.09 seconds ===========================


Just with this, we're already in a much better place than we were.
We're now testing multiple different parameterizations of our program.
However, one of the only reasons this seems reasonable is that all this
time the test specification has been skipping large numbers of
parameterizations in the interest of brevity. In a real program, no one
wants to have to type out a hundred different hard coded test cases.
What would be much better is to both have many different
parameterizations and to also have brevity at the same time.

One way to do that is to have our arguments be programmatically
generated rather than specified by hand.


``` python
%%pytest

# Parameterized test, with pytest
import pytest


def add(a, b):
    return a + b

def create_sum_arguments(start, end):
   "Generate a list of test parameterizations."
   return [(a, a+1) for a in range(start, end)]

@pytest.mark.parametrize('a, b', create_sum_arguments(1, 99))
def test_sum_positive(a, b):
   assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmp893idtid, inifile:
    plugins: hypothesis-4.15.0
    collected 98 items

    _ipytesttmp.py ......................................................... [ 58%]
    .........................................                                [100%]

    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ==================== 98 passed, 1 warnings in 0.57 seconds =====================


Let's take a moment to
[compare](https://en.wikipedia.org/wiki/Big_O_notation) generating a
list of argument with our previous approach of writing out each argument
individually in terms of how many lines it takes to write the tests.

  ---------------------------|---------------------------|---------------
  Test Paramterizations      | Lines for hand  specification | Lines for programmatic creation
  ---------------------------| --------------------------|--------------
  1                          | 1                         | 2
  2                          | 2                         | 2
  3                          | 3                         | 2
  100                        | 100                       | 2
  1000                       | 1000                      | 2
  10000                      | 10000                     | 2
  n                          | O(n)                      | O(1)

With list creation, we can list a hundred different arguments in roughly
two lines. With hand specification, it takes around a hundred lines. So
the number of lines of code per test with list creation grows O(1) while
the number of lines of code per test with hand specification grows O(n)
where n is the number of test cases.

This is a great improvement, especially if the constant size of each
argument is high, but even with the add function **generating a million
test paramterizations programmatically is cheaper in terms of hand
movement than writing three manually**.

With that power in mind, one weakness of creating a list of test cases
is the amount of memory used. It isn't obvious with the add function,
but consider the case of testing an image parsing library with each test
case being an image buffer of a 1 MB image.

Although we are able to generate our test cases in O(1) lines of code,
it is still going to consume O(n) memory where n is the number of
images. If we generated a hundred samples, we would need 100 MB of
space. With a million, we're likely to run out of memory and crash.

It is easy to fix that, by taking advantage of the [lazy
evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) via a
[generator expression](https://www.python.org/dev/peps/pep-0289/).

``` python
%%pytest

# Parameterized test, with pytest
import pytest


def add(a, b):
    return a + b

def yield_sum_arguments(start, end):
   "Return a generator which yields test parameterizations tuples."
   return ((a, a+1) for a in range(start, end))

@pytest.mark.parametrize('a, b', yield_sum_arguments(1, 99))
def test_sum_positive(a, b):
   assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpzpc558np, inifile:
    plugins: hypothesis-4.15.0
    collected 98 items

    _ipytesttmp.py ......................................................... [ 58%]
    .........................................                                [100%]

    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ==================== 98 passed, 1 warnings in 0.56 seconds =====================


  ------------------------------|-------------------------------|-----------
  Test Paramterizations         | Memory used for list creation | Memory used in lazy evaluation
  ------------------------------|-------------------------------|-----------
  1                             | 1 MB                          | 1 MB
  2                             | 2 MB                          | 1 MB
  3                             | 3 MB                          | 1 MB
  100                           | 100 MB                        | 1 MB
  1000                          | 1000 MB                       | 1 MB
  10000                         | 10000 MB                      | 1 MB
  n                             | O(n)                          | O(1)

Lazy evaluation helps with more than our space issue. It also improves
the development cycle of an engineer interacting with the tests. When
fixing breaking test cases, we're not interested in every test. Having
to do a lot of work generating test cases that will never run is a waste
of time.

It's a good sign that as we improve the architecture of our tests, we
start getting more and more useful properties. Parameterized tests which
are generated as needed are a step in the right direction.

Still, so far none of the tests have managed to show us the obvious -
calling add on two negative numbers isn't going to return a positive
number.

Really, we don't want to write a loop that generates parameters so much
as a loop that generates a set of parameters which finds places where
our hypothesis about how our program works is not true.

We want something like:

``` python
# @pytest.mark.parametrize('a, b', a_scientific_search_strategy)
# def test_sum_positive(a, b):
#   assert add(a, b) > 0
```

How can we do that?

Back in the 1990s Koen Claessen and John Hughes wrote a paper on
[QuickCheck](http://www.eecs.northwestern.edu/~robby/courses/395-495-2009-fall/quick.pdf),
a Haskell testing library which aided Haskell programmers in formulating
and testing the properties of programs \[4\]. The library gives tools to
make writing these sort of parameterized tests easy. It even goes
farther than that and tries to simplify any samples it finds which cause
a failure, so that the failures it finds are easier for an engineer to
understand.

In the world of people who care about testing, this library has been
influential. It's been [ported to several other
languages](https://hypothesis.works/articles/quickcheck-in-every-language/),
with varying degrees of rigour. For some languages, it's even been
elevated into core testing libraries.

Here is the instrument that I hope to give you. It is a testing library,
inspired by QuickCheck, called `hypothesis`.

## [What is hypothesis?](#what-is-hypothesis)

<div class="epigraph">
<blockquote>
<p>
Hypothesis is a modern implementation of property based testing.
</p>
<p>
Hypothesis runs your tests against a much wider range of scenarios
than a human tester could, finding edge cases in your code that you
would otherwise have missed. It then turns them into simple and easy
to understand failures that save you time and money compared to fixing
them if they slipped through the cracks and a user had run into them
instead.
</p>

<p>
Hypothesis integrates into your normal testing workflow. Getting
started is as simple as installing a library and writing some code
using it - no new services to run, no new test runners to learn.
</p>

<footer>
<p>
    <a href="https://hypothesis.works/">hypothesis.works</a>
</p>
</footer>
</blockquote>
</div>

## [Installing Hypothesis](#installing-hypothesis)

Let's begin with hypothesis where we left off with a paramterized
testing strategy. To do that, we will first need to install it.

``` python
! /usr/bin/python3 -m pip install hypothesis
```

    Requirement already satisfied: hypothesis in /usr/local/lib/python3.6/dist-packages (4.15.0)
    Requirement already satisfied: attrs>=16.0.0 in /usr/local/lib/python3.6/dist-packages (from hypothesis) (19.1.0)

Now that we've installed it, we can write out our more scientific
search strategy.

``` python
%%pytest
# Parameterized test, with pytest and hypothesis
from hypothesis import given, strategies


def add(a, b):
    return a + b


@given(strategies.integers(), strategies.integers())
def test_sum_positive(a, b):
   assert add(a, b) > 0
```


    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpxykp99zo, inifile:
    plugins: hypothesis-4.15.0
    collected 1 item

    _ipytesttmp.py F                                                         [100%]

    =================================== FAILURES ===================================
    ______________________________ test_sum_positive _______________________________

        @given(strategies.integers(), strategies.integers())
    >   def test_sum_positive(a, b):

    _ipytesttmp.py:10: 
    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

    a = 0, b = 0

        @given(strategies.integers(), strategies.integers())
        def test_sum_positive(a, b):
    >      assert add(a, b) > 0
    E      assert 0 > 0
    E       +  where 0 = add(0, 0)

    _ipytesttmp.py:11: AssertionError
    ---------------------------------- Hypothesis ----------------------------------
    Falsifying example: test_sum_positive(a=0, b=0)
    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ===================== 1 failed, 1 warnings in 0.33 seconds =====================

This simple, unassuming bit of code is doing a lot. It generates a
hundred samples; runs a hundred tests. Yet it does this with less code
than our earlier parameterization approach and not only that, but for
the first time we have code which will quickly find the error that is so
blatant. It discovers the counterexamples where `a` and `b` are not
positive.

Let's break this down. `@given` is a
[decorator](https://www.python.org/dev/peps/pep-0318/). A decorator is
Python syntactic sugar for a [higher-order
function](https://en.wikipedia.org/wiki/Higher-order_function), which is
a function that accepts a function as an argument and returns another
function. The `given` decorator takes in a data generation strategies
and a parameterized test and returns a test which will call the
parameterized test using the provided data generation strategy.

`strategies` is a module imported from the `hypothesis` library. It
contains functions which help an engineer to create samples from many
common data types. It also provides ways to combine and compose
strategies, so that even complex data generation is possible.

`integers` is one of the strategies it provides. It has a few arguments
it accept which can be used to change what integers it will generate
during testing, but I won't go into that here. The hypothesis project
has [excellent
documentation](https://hypothesis.readthedocs.io/en/latest/data.html).
You can read about `integers()` and other data generation strategies
there. For our purposes, it's more important to to know that there is a
way to generate a lot of different data. Even complex data.

Earlier I showed how to generate integers. We could easily extend this
to also generate floats, decimals, fractions, and complex numbers.


``` python
%%pytest
# More complex data generation strategies

from hypothesis import given, strategies


def add(a, b):
    return a + b

number_strategy = (
  strategies.floats() |
  strategies.decimals() |
  strategies.complex_numbers() |
  strategies.fractions() |
  strategies.integers() 
)

@given(number_strategy, number_strategy)
def test_sum_positive(a, b):
   assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpiq6lujss, inifile:
    plugins: hypothesis-4.15.0
    collected 1 item

    _ipytesttmp.py F                                                         [100%]

    =================================== FAILURES ===================================
    ______________________________ test_sum_positive _______________________________

        @given(number_strategy, number_strategy)
    >   def test_sum_positive(a, b):

    _ipytesttmp.py:18: 
    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

    a = 0.0, b = 0.0

        @given(number_strategy, number_strategy)
        def test_sum_positive(a, b):
    >      assert add(a, b) > 0
    E      assert 0.0 > 0
    E       +  where 0.0 = add(0.0, 0.0)

    _ipytesttmp.py:19: AssertionError
    ---------------------------------- Hypothesis ----------------------------------
    Falsifying example: test_sum_positive(a=0.0, b=0.0)
    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ===================== 1 failed, 1 warnings in 0.18 seconds =====================

Hypothesis gives a lot of expressive power. It was easy to get a data
generator that generated a much more rich set of data for testing.

For the purpose of driving this point home, let's suppose that for some
reason our addition function wasn't supposed to ever be called with `0`
as an argument or with a number that somehow became a `NaN`.

``` python
%%pytest
# More complex data generation strategies
import math


from hypothesis import given, strategies


def add(a, b):
    return a + b

number_strategy = (
  strategies.floats() |
  strategies.decimals() |
  strategies.complex_numbers() |
  strategies.fractions() |
  strategies.integers() 
).filter(lambda x: x != 0 and not math.isnan(x))

@given(number_strategy, number_strategy)
def test_sum_positive(a, b):
    assert add(a, b) > 0


# Or we could use assume

from hypothesis import assume

number_strategy = (
  strategies.floats() |
  strategies.decimals() |
  strategies.complex_numbers() |
  strategies.fractions() |
  strategies.integers() 
)

@given(number_strategy, number_strategy)
def test_sum_positive(a, b):
    assume(a != 0 and b != 0 and not math.isnan(a) and not math.isnan(b))
    assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpdxsnwtw3, inifile:
    plugins: hypothesis-4.15.0
    collected 1 item

    _ipytesttmp.py F                                                         [100%]

    =================================== FAILURES ===================================
    ______________________________ test_sum_positive _______________________________

        @given(number_strategy, number_strategy)
    >   def test_sum_positive(a, b):

    _ipytesttmp.py:37: 
    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

    a = 1, b = -1

        @given(number_strategy, number_strategy)
        def test_sum_positive(a, b):
            assume(a != 0 and b != 0 and not math.isnan(a) and not math.isnan(b))
    >       assert add(a, b) > 0
    E       assert 0 > 0
    E        +  where 0 = add(1, -1)

    _ipytesttmp.py:39: AssertionError
    ---------------------------------- Hypothesis ----------------------------------
    Falsifying example: test_sum_positive(a=1, b=-1)
    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ===================== 1 failed, 1 warnings in 0.42 seconds =====================

If you've been playing with these examples, you may have noticed that
hypothesis has found breaking examples quite easily. Not just ones where
the function returned a negative result, but actual errors. The add
function isn't overloaded so as to support adding arbitray numeric
types. If it wasn't an error you expected to see, than you may begin to
understand just how useful this search for falsifying examples is. It
doesn't just give you confidence that your code works. It can end up
teaching you something you hadn't known.

At the same time, you might not have seen these errors. When hypothesis
runs tests, it generates them stoachastically. It's possible for two
different runs of hypothesis to generate different examples.

This is an important thing to keep in mind when using `hypothesis`. It
is generating data, not doing magic. Under the hood it has a search
strategy which is searching for things to pass in as test parameters.
Given a strict data generation strategy, it might not be able to find
valid parameterizations. Even if it does find parameterizations, it
could still skip over important test cases that an engineer knows to be
of critical importance.

For this reason and others, it can still be useful to hand specify
important test cases. This can be done using the `@example` decorator.

``` python
%%pytest
# Parameterized test, with pytest and hypothesis
from hypothesis import given, strategies, example


def add(a, b):
    return a + b


@given(strategies.integers(), strategies.integers())
@example(-100, -100)
def test_sum_positive(a, b):
   assert add(a, b) > 0
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmpp9g8cudf, inifile:
    plugins: hypothesis-4.15.0
    collected 1 item

    _ipytesttmp.py F                                                         [100%]

    =================================== FAILURES ===================================
    ______________________________ test_sum_positive _______________________________

        @given(strategies.integers(), strategies.integers())
    >   @example(-100, -100)
        def test_sum_positive(a, b):

    _ipytesttmp.py:10: 
    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
    /usr/local/lib/python3.6/dist-packages/hypothesis/core.py:327: in execute_explicit_examples
        test_runner(None, lambda data: test(*arguments, **example_kwargs))
    /usr/local/lib/python3.6/dist-packages/hypothesis/executors.py:56: in default_new_style_executor
        return function(data)
    /usr/local/lib/python3.6/dist-packages/hypothesis/core.py:327: in <lambda>
        test_runner(None, lambda data: test(*arguments, **example_kwargs))
    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

    a = -100, b = -100

        @given(strategies.integers(), strategies.integers())
        @example(-100, -100)
        def test_sum_positive(a, b):
    >      assert add(a, b) > 0
    E      assert -200 > 0
    E       +  where -200 = add(-100, -100)

    _ipytesttmp.py:12: AssertionError
    ---------------------------------- Hypothesis ----------------------------------
    Falsifying example: test_sum_positive(a=-100, b=-100)
    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ===================== 1 failed, 1 warnings in 0.20 seconds =====================

## [Environmental Considerations](#environmental-considerations)

There are concerns that a developer has which aren't about the beauty
of an approach, but about the practicality of use. There are many
programming languages that are objectively better than Python by one
metric or another, yet it has it's niche, because it chooses to be
readable rather than fast or easily parsed by computers.

So far we've discussed code. Let's move on to some other software
engineering best practices and see how `hypothesis` holds up.

Ironically, since we're using Python, when it comes to testing speed
matters. There are things that can be done when something takes seconds
which can't even be contemplated when something takes an hour. For
example, having a continual testing loop running concurrently with
development or running tests before check in become a much simpler thing
when tests run quickly, but can slow down development speed if tests
take hours to run.

`hypothesis` does well in helping to deliver the ideal of fast running
tests. It provides tools for limiting both the runtime of tests
according to the clock and for limiting the runtime of tests in terms of
the number of test cases it checks.

On the topic of a contiual test loop, it's also nice to keep a record
of what tests fail and than re-run those tests on the next run of the
tester. `hypothesis` does this too.

One way that these sorts of things can be done on a per test basis is
through the settings decorator.


``` python
%%pytest

from hypothesis import given, settings, strategies

@given(strategies.integers())
@settings(max_examples=50) # Default is 100
def test_this_a_little(x):
    assert True
    

@given(strategies.integers())
def test_this_with_default_setttings(x):
    assert True
    
@given(strategies.integers())
@settings(max_examples=500)
def test_this_thoroughly(x):
    assert True
```

    ============================= test session starts ==============================
    platform linux -- Python 3.6.7, pytest-3.6.4, py-1.8.0, pluggy-0.7.1
    hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/tmpuliw3v4m/.hypothesis/examples')
    rootdir: /tmp/tmp0nvvccac, inifile:
    plugins: hypothesis-4.15.0
    collected 3 items

    _ipytesttmp.py ...                                                       [100%]

    =============================== warnings summary ===============================
    <undetermined location>
      Module already imported so cannot be rewritten: hypothesis

    -- Docs: http://doc.pytest.org/en/latest/warnings.html
    ===================== 3 passed, 1 warnings in 0.80 seconds =====================


Another way is via the settings profile:

``` python
from hypothesis import  settings, Verbosity

settings.register_profile("ci", max_examples=1000)
print("Max examples before loading ci profile", settings().max_examples)
settings.load_profile("ci")
print("Max examples after loading ci profile", settings().max_examples)
```

    Max examples before loading ci profile 100
    Max examples after loading ci profile 1000

Beyond just running fast, thorough tests are also a nice to thing to
have. Thorough testing gives more confidence that software works as
desired than minimal testing, all other factors ignored.

Since the settings profiles can be set based on flags, `hypothesis`
tackles supporting more thorough testing in automated build servers in a
straightforward way. When doing local development, we can run just a few
tests. Meanwhile, on a build server we can run thousands.

``` python
import os
from hypothesis import settings, Verbosity
settings.register_profile("weekend", max_examples=100000)
settings.register_profile("nightly", max_examples=10000)
settings.register_profile("ci", max_examples=1000)
settings.register_profile("dev", max_examples=100)
settings.register_profile("debug", max_examples=10, verbosity=Verbosity.verbose)
settings.load_profile(os.getenv(u'HYPOTHESIS_PROFILE', 'default'))
```

The `sympy` project found errors after letting `hypothesis` generate
millions of examples. Errors that hadn't been found with less thorough
testing.

Hypothesis gives us an easy to tune knob which results in more thorough
testing. This control gives a lot more power to engineers to make trade
offs based on the context in which tests are being run. Out of band
testing can be thorough to the point of absurdity while work that is in
flow can be fast so as to maximize engineer productivity.

## [Library integration](#library-integration)

Hypothesis has support for many popular python librarys, including
django. It can infer strategy creation from a Django model or form. In a
hypothetical example, let's say you have an email address model which
is related to a contact model, which is related to an organization
model. In order to get a strategy which could automatically fill in all
the data for instances of those models all that would be needed would
be:

## In Summary

Cast aside the hard coded test cases and accept a better violin.
[hypothesis.works](https://hypothesis.works/)

# Footnotes

<div id="software">
<p>
Reliable software isn't easy to write. Great engineers and scientists have quipped that
programming is the act of putting bugs into a program, since debugging
is the act of taking them out. For this reason, when I write
"software" I'm defining it in a narrow sense of the word; not full
applications, but small sections of a program.
</p>
<p>
<a href="#introduction">Jump back to introduction.</a>
</p>
</div>

<div id="reliable">
<p>
I'm defining "reliable" in a narrow sense. When I say reliable,
I mean that we have good reason to be confident that the software has
the properties which we desire it to have. We expect the software to
work how we think it works, rather than some other way. So reliable as
in "we think we might be able rely on it", not, this definitely works
always. I wish I could say that I was doing more than building
confidence that the programs we write really did have the properties we
hoped they would have, but the instrument I'm sharing does not generate
proofs. It is a way to generate tests.
</p>
<p>
<a href="#introduction">Jump back to introduction.</a>
</p>
</div>

<div id="tools_shape">

<p>
This goes beyond programming languages and testing libraries.
Consider PowerPoint.
One humorous example of PowerPoint struggling to capture importance is  
<a href="https://norvig.com/Gettysburg/">Peter Norvig's Gettysburg address</a>.
But there are much more horrific <a href="https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001yB">examples</a>.
These structual implications are part of the underyling reason behind why  companies like Amazon are
<a href="https://www.inc.com/carmine-gallo/jeff-bezos-bans-powerpoint-in-meetings-his-replacement-is-brilliant.html">forsaking PowerPoint in favor of the written
word</a>.
</p>

<p>
More serious discussion of the corrupting biases of mediums can be found Neil Postman's work 
<a href="https://www.amazon.com/Amusing-Ourselves-Death-Discourse-Business/dp/014303653X">Amusing Ourselves to Death: Public
Discourse in the Age of Show Business</a>.
</p>

<p>
<a href="#violin">Jump back to quote.</a>
</p>
</div>

<div id="others">
<p>
Beyond the normal errors there are other problems the add
function is potentially vulnerable to. For example, we haven't verified
that it is resistant to bit corruption by alpha particles or faulty
hardware. Everything we leave out of our test is a potential source of a
flaky test, since each uncontrolled parameter is still an implicit
parameters that can change program execution.
</p>
<p>
In the case of the add function, this problem might feel theoretical,
but it's not theoretical at all with remote APIs. Allowing tests to
simulate failures is important.
</p>
<a href="#tutorial">Jump back to tutorial.</a>
</div>