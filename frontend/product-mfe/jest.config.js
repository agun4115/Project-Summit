module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  performance: {
    maxAssetSize: 500000, // 500 KiB
    maxEntrypointSize: 500000, // 500 KiB
    hints: 'warning' // or 'error' or false to disable
  }
};
