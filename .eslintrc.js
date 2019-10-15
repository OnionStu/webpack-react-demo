module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    process: true,
    __dirname: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', 'json']
      }
    }
  }
};
