import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettierConfig,
	{
		plugins: {
			'sort-keys-fix': sortKeysFix,
		},
		rules: {
			// TypeScript best practices
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ fixStyle: 'inline-type-imports', prefer: 'type-imports' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],

			// General best practices
			curly: ['error', 'all'],

			eqeqeq: ['error', 'always'],

			'no-console': ['warn', { allow: ['warn', 'error'] }],

			'no-var': 'error',

			'prefer-const': 'error',

			// React best practices
			'react/jsx-curly-brace-presence': ['error', { children: 'never', props: 'never' }],

			'react/jsx-sort-props': [
				'error',
				{
					callbacksLast: true,
					ignoreCase: true,
					reservedFirst: true,
					shorthandFirst: true,
				},
			],

			'react/self-closing-comp': ['error', { component: true, html: true }],
			// Object keys sorting
			'sort-keys-fix/sort-keys-fix': [
				'error',
				'asc',
				{ caseSensitive: false, natural: true },
			],
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
