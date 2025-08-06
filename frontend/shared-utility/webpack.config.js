const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "shared-utility",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      alias: {
        'Slice': require('path').resolve(__dirname, 'src/slice'),
        'Functions': require('path').resolve(__dirname, 'src/functions'),
        'Stores': require('path').resolve(__dirname, 'src/stores'),
      }
    }
  });
};
