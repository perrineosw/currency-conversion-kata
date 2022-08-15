# Kata-seed

This seed contains setup for kata involving Unit testing and code coverage.

It is available in several-languages in order to enable as many people as possible to have a quick setup. Check the `README.md` file in each folder to see how to setup your solution.

## Your goal
The aim is to get a good coverage, which you can for example do:
* first with __spies and mocks__ (i.e with a testing framework)
* then with __fakes__. (Hint: you will probably need to introduce an interface to ease the fake usage...)

You want to cover :
* the functional part (sums correctly works)
* the performance part: we want to be sure we have minimized the number of calls to the API for each conversion we perform

Note that Jacoco will run only if tests are green

## Initial state

The code is implemented, but the external dependency is kind of annoying in the test.

One test has been started, but the result should be a failure with error message looking like : `401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?`