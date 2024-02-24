/*
 * "Note that ESLint does not support ESM configuration at this time."
 * ref: https://eslint.org/docs/latest/use/configure/configuration-files
 */
module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'off',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'jest/no-commented-out-tests': 'off',
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: false,
      },
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'arrow-body-style': 'off',
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'jest', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],

    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    "@typescript-eslint/no-explicit-any": "off",

    // 2 space indentation
    'indent': ['error', 2],

    // Style
    'quotes': ['error', 'single', { avoidEscape: true }],

    // Cannot import from the same module twice
    'no-duplicate-imports': ['error'],

    // Cannot shadow names
    'no-shadow': ['error'],

    // Required spacing in property declarations (copied from TSLint, defaults are good)
    'key-spacing': ['error'],

    // Require semicolons
    'semi': ['error', 'always'],

    // Don't unnecessarily quote properties
    'quote-props': ['error', 'consistent-as-needed'],

    // No multiple empty lines
    'no-multiple-empty-lines': ['error'],

    // Max line lengths
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true, // Most common reason to disable it
        ignoreStrings: true, // These are not fantastic but necessary for error messages
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],

    // Useless diff results
    'no-trailing-spaces': ['error'],

    // Must use foo.bar instead of foo['bar'] if possible
    'dot-notation': ['error'],

    // Are you sure | is not a typo for || ?
    'no-bitwise': ['error'],

    // Not enforcing props validation for React
    'react/prop-types': 'off',
  },
};
