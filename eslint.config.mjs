import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettierConfig,
	{
		rules: {
			// TypeScript best practices
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
			],

			// React best practices
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
			'react/self-closing-comp': ['error', { component: true, html: true }],

			// General best practices
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],
			'prefer-const': 'error',
			'no-var': 'error',
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'node_modules/**',
	]),
]);

export default eslintConfig;
