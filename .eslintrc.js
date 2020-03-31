module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module"
    },
    extends: [
      "eslint:recommended"
    ],
    rules: {
      "no-extra-semi": "off"
    },
    env: {
      node: true,
      browser: true,
      es6: true
    }
};