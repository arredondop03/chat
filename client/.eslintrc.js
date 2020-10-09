module.exports = {
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true
  },
  extends: [
    'plugin:react/recommended',
    "plugin:jest/recommended",
    "plugin:jest/style",
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
  },
};
