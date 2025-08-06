const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "ui-utility",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
      },  
      externals:[
      "@sysco/shared-utility"
    ],
    // modify the webpack config however you'd like to by adding to this object
  });
};
