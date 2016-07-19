SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "Doodle3D-API/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.7",
      "traceur": "github:jmcriffey/bower-traceur@0.0.90",
      "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.90",
      "process": "github:jspm/nodelibs-process@0.2.0-alpha",
      "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "path": "github:jspm/nodelibs-path@0.2.0-alpha"
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime"
    ],
    "stage": 0
  },
  map: {
    "babel": "npm:babel-core@5.7.4"
  },
  packages: {
    "Doodle3D-API": {
      "main": "index.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "EventDispatcher": "github:mrdoob/eventdispatcher.js@1.0.0",
    "github/fetch": "github:github/fetch@0.9.0",
    "jquery": "github:components/jquery@2.2.4"
  },
  packages: {}
});
