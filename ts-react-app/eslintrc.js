module.exports = {
  extends: 'react-app',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // '@typescript-eslint/no-inferrable-types': 'off'
  },
}