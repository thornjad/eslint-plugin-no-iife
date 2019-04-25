# eslint-plugin-no-iife

An [eslint](http://eslint.org/) plugin to prevent immediately-invoked function
expression (IIFE) usage in your code.

[![pipeline status](https://gitlab.com/thornjad/eslint-plugin-no-iife/badges/master/pipeline.svg?style=flat-square)](https://gitlab.com/thornjad/eslint-plugin-no-iife/commits/master)
[![npm](https://img.shields.io/npm/v/eslint-plugin-no-iife.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-no-iife)
[![license](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://gitlab.com/thornjad/eslint-plugin-no-iife/blob/master/LICENSE)

## Installation

```shell
npm install --save-dev eslint-plugin-no-iife
```

## Usage

In your `.eslintrc` (or wherever your eslint configuration lives):

```json
{
  "plugins": [
    "no-iife"
  ],
  "rules": {
    "no-iife/no-iife": "error"
  }
}
```

## Rule details

This rule prevents all immediately-invoked function expressions.

## Why

Immediately-invoked function expressions are a messy remnant of early
Javascript, and their use today only serves to decrease readability. Their use
can and should be entirely replaced with minimal thought.

Historically, IIFEs had two main advantages. First, it served as a shorthand for
calling a function which was just defined. While this pattern can lead to
convoluted code, there are a handful of legitimate reasons to call code
immediately after definition, such as factory functions. However, it is much
more human-readable to define a function and then call it in the next statement.
Compare this IIFE:

```javascript
const x = (function() {
  return function() {
    foo();
  }
})();
```

With this version:

```javascript
const y = function() {
  return function() {
    foo();
  }
};
const x = y();
```

The other use case for IIFEs was much more practical; imposing a limited scope.
In a normal script, `var` hoists to the top of the function scope. In a
top-level script, the function scope is global, making all the variables global.
And since `var` variables can be reassigned with another use of `var`, it's all
too easy to override existing globals. Besides, having so many global variables
makes debugging far more difficult.

IIFEs solve this problem by wrapping a script in an anonymous function, limiting
the scope to just one page (or less). This was a savior for many common
problems, but at the cost of being messy and confusing.

In modern Javascript, however, `var` is rarely used, and so the problem of
global variable pollution has entirely disappeared. By using `const` and `let`,
there is simply no need for IIFEs anymore.

## Disabling the rule

Really, _really_ need to use an IIFE? Your call:

```javascript
// eslint-disable-next-line no-iife/no-iife
(function() {
  // ...
})()
```

## License

Copyright (c) 2019 Jade Michael Thornton

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
