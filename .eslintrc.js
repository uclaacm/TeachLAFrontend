module.exports = {
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
      extends: ['airbnb-typescript'],
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
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'prettier',
    'airbnb',
    'plugin:import/typescript',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './jsconfig.json',
  },
  plugins: ['import', 'react', 'jest'],
  rules: {
    // ignore file extensions when importing
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'linebreak-style': ['error', 'unix'],

    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

    // 2 space indentation
    'indent': ['error', 2],

    // Style
    'quotes': ['error', 'single', { avoidEscape: true }],

    // ensures clean diffs, see https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
    'comma-dangle': ['error', 'always-multiline'],

    // Require all imported dependencies are actually declared in package.json
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Disallow importing optional dependencies (those shouldn't be in use in the project)
        optionalDependencies: false,
        peerDependencies: false, // Disallow importing peer dependencies (that aren't also direct dependencies)
      },
    ],

    // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
    'import/no-unresolved': ['error'],

    // Require an ordering on all imports
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

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

    // Don't leave log statements littering the premises!
    'no-console': ['error', { allow: ['error'] }],

    // Not enforcing jsx extension
    'react/jsx-filename-extension': 'off',

    // For loops are ok
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // AirBNB changed this to only allow function-expressions
    'react/function-component-definition': 'off',
  },
};
