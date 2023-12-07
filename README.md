# WCTest 🚻

This is a test about testing web components with the node test runner :).
The web component to be tested is a progressively enhanced `<password-input>` component which is wrapped around an input.

When the input is a clear-text field, it creates a `hide` button, when the input is a password field, it creates a `show` button, making it possible to toggle between a revealed and hidden input.

## `node --test`

node.js comes with an integrated test runner, which is a very lightweight way to run tests.
The built-in test runner lives inside the `node:test` package and can be started via `node --test`. All files with a `.test.js` suffix are processed, also handling `.mjs` and `.cjs` files.

The test is using the `describe` and `it`-syntax which can be imported from `"node:test"`.

## Assertions

As assertion library, we are using the integrated `node:assert/strict`. It is recommended to use strict assertions as the un-strict ones use the very lax `==` JavaScript comparisons rather than `===`.

In case you are more familiar with the `expect` syntax from jest and/or jasmine, you can use `chai.js` as assertion library.

## Simulating a browser environment with linkedom inside the node test

We can use [LinkeDOM](https://github.com/WebReflection/linkedom) to simulate a minimal browser environment.  

```js
window = global.window = parseHTML(`<!DOCTYPE html><html><head></head><body></body></html>`);
```

In order to get the returned window object working with the componet to be tested, we have to pollute window and several other DOM objects into the global namespace and then dynamically load the component via `await import()`.
