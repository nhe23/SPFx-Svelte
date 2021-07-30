"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push({
      test: /\.(html|svelte)$/,
      exclude: /node_modules/,
      use: [
        // {loader: "ts-loader"},
        {
          loader: "svelte-loader",
          options: {
            preprocess: require("svelte-preprocess")({
              tsconfigFile: "./tsconfig.json"
            }),
          },
        },
      ],
    });

    return generatedConfiguration;
  },
});

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

build.initialize(gulp);
