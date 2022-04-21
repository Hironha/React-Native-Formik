module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
          },
        },
      ],
    ],
  };
};
