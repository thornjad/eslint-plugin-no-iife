'use strict';

module.exports = context => {
	return {
		CallExpression(node) {
			const callee = node.callee;
			if (callee.type === "FunctionExpression"
					|| (callee.type === "MemberExpression"
							&& callee.object.type === "FunctionExpression")
				 ) {
				context.report({
					node,
					message: 'Immediately-invoked function expressions are not allowed',
				});
			}
		}
	};
};
