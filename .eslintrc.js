module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {},
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  extends: ['airbnb'], // "plugins": ["react","import","jsx-a11y"],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'comma-dangle': [1, 'only-multiline'],
    'linebreak-style': [0, 'windows'],
    'max-len': [1, 160, 2, { ignoreComments: true }],
    "no-console": 0,
    'no-unused-vars': 1,
    'quotes': [1, 'single'],
    // "react/jsx-uses-vars": 2, // Prevent variables used in JSX to be incorrectly marked as unused
    // "react/jsx-uses-react": 2, // Prevent React to be incorrectly marked as unused
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'import/first': 1,
    'jsx-a11y/anchor-is-valid': 0,
    // "spaced-comment": "warn",
    // "no-debugger": "warn",
    // "semi": ["warn", "always"],
    // "no-empty": "warn",
    // "no-empty-function": "warn",
    // "no-empty-pattern": "error",
    // "no-multi-spaces": "warn",
    // "no-unmodified-loop-condition": "error",
    // "comma-spacing": ["warn", { "before": false, "after": true }],
    // "no-var":"warn",
    // "dot-location":["warn","property"], // 换行时点的位置
    // "newline-per-chained-call":[1,{"ignoreChainWithDepth":3}] // 链式调用的深度
  },
  /**
   *  "off" 或 0 - 关闭规则
   *  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
};
