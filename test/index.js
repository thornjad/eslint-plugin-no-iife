const rule = require('../lib/no-iife');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 2018}
});

const errors = [{
	ruleId: 'no-iife',
	message: 'Immediately-invoked function expressions are not allowed'
}];

ruleTester.run('no-iife', rule, {
  valid: [
    'foo()',
    'bar(a, b, c)',
    'function baz() {}; baz();',
    'const x = function() {}; const y = x();'
  ],
  invalid: [
    {
      code: 'const x = function() {}();',
      errors,
    },
    {
      code: 'const x = (function () {})();',
      errors,
    },
    {
      code: 'const x = (function () {}())',
      errors,
    },
    {
      code: '(function x() {})();',
      errors,
    },
    {
      code: '(function x() {}());',
      errors,
    },
  ],
});
