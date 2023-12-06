# WCTest 🚻

This is a test about testing web components with the node test runner :).
The web component to be tested is a progressively enhanced `<password-input>` component which is wrapped around an input.

When the input is a clear-text field, it creates a `hide` button, when the input is a password field, it creates a `show` button, making it possible to toggle between a revealed and hidden input.

The test is using the `describe` and `it`-syntax from `"node:test"` and the strict assertions from `node:assert/strict`. It is recommended to use strict assertions as the un-strict ones use the very lax `==` JavaScript comparisons rather than `===`.
