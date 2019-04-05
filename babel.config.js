module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {"node": 8},
      useBuiltIns: "usage",
    }],
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
  ],
};
