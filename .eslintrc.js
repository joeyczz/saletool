module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    Babel: true,
    React: true
  },
  plugins: ["prettier", "react"],
  rules: {
    // "global-require": "off",
    // "no-new-func": "off",
    // "no-restricted-syntax": "off",
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "react/prefer-stateless-function": "off",
    "react/no-multi-comp": "off", 
    "react/jsx-no-bind": "off",
    "react/jsx-indent": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-filename-extension": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": ["error", { allow: ["log", "warn", "error"] }]
    // "max-len": ["error", { ignorePattern: "^\\s*<.+>$" }]
  }
};
