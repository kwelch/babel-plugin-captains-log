module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {"node": 10},
      useBuiltIns: "usage",
      "corejs": "3",
    }],
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
  ],
};
