const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "auth-mfe",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
      externals:[
      "@sysco/shared-utility",
      "@sysco/ui-utility",
    ],
     resolve: {
      alias: {
        'Components': require('path').resolve(__dirname, 'src/Components'),
        'Constants': require('path').resolve(__dirname, 'src/Constants'),
        'APIs': require('path').resolve(__dirname, 'src/Apis')
      }
    }
  });
};
