const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "cart-mfe",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    externals:[
      "@sysco/ui-utility",
      "@sysco/shared-utility",
    ],
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src/Components'),
        'APIs': require('path').resolve(__dirname, 'src/Apis')
      }
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
