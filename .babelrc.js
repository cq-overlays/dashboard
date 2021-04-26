const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
]

module.exports = { plugins }
