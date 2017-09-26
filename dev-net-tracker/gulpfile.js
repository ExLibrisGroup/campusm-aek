/*
-------------------------------------------------------------------
Gulp
-------------------------------------------------------------------

Gulp is a toolkit for automating painful or time-consuming tasks
in your development workflow.
*/

var gulp = require("gulp");
var aek = require("@ombiel/aek-cli");
var buildtools = require("@ombiel/aek-buildtools");
var cssMiddleware = require("@ombiel/aek-buildtools/css-middleware");
var aekGulp = buildtools.gulp;
var screenMiddleware = require("@ombiel/aek-buildtools/screen-middleware");
var predeploy = aekGulp.predeploy({gulp: gulp, buildTask: "build"});
var path = require("path");

/* ------------ SETTINGS ------------ */
var runserverOptions = {};
/*
var runserverOptions = {
  // Sets the port on which your local sever will run.
  port: 5000,

  // Set this if your network requires a proxy server.
  useProxy: "http://localhost:8888",


  // If you have trouble validating SSL certificates, you can switch them off,
  // but note that this leaves you vulnerable to man-in-the-middle attacks.
  bypassSSLVerification : true,

  // Log every http request in the terminal.
  logs : true
};
*/

var webpackOptions = {
  srcBase: path.resolve(__dirname, "src/js/"),
  dest: path.resolve(__dirname, ".build/public/js"),
  recordHash: false,
  alias: {
    "-components": "@ombiel/aek-lib/react/components",
    "-aek": "@ombiel/aek-lib"
  }
};

var cssOptions = {
  srcBase: path.resolve(__dirname, "src/css/"),
  destination: path.resolve(__dirname, ".build/public/css"),
  define: {
    "aekCssPath": require.resolve("@ombiel/aek-css/index.styl")
  }
};

var screenOptions = {
  srcBase: path.resolve(__dirname, "src/screens/"),
  dest: path.resolve(__dirname, ".build/screens/")
};

buildtools.webpackMiddleware.setOptions(webpackOptions);
cssMiddleware.setOptions(cssOptions);
screenMiddleware.setOptions(screenOptions);

/* ------------ GULP TASKS ------------ */
// This authenticates the user.
gulp.task("auth", function() {
  return aek.cli.processCommand("auth", {silent: true});
});

/*
The "runserver" task results in:
  New runserver.yaml config applied
  Plugin '/public/js' installed @ombiel/aek-buildtools/webpack-middleware
  Plugin '/public/css' installed @ombiel/aek-buildtools/css-middleware
  Plugin '/aek/c' installed @ombiel/aek-buildtools/screen-middleware
  AEK proxy server targetting {hostname}, listening on port 5000
*/
gulp.task("runserver", ["auth"], function() {
  return aek.cli.processCommand("runserver", runserverOptions);
});

// Sets the default task. This is triggered from 'aek start' command.
gulp.task("default", ["runserver"], function() {
  cssMiddleware.transpile(true);
  buildtools.webpackMiddleware.start();
});

// Sets up webpack, which is a module bundler for modern JavaScript apps.
gulp.task("webpack_prod", function() {
  return aekGulp.webpack(true, webpackOptions);
});

// Transpiles CSS and reports errors.
gulp.task("css_prod", cssMiddleware.gulp(false, {}));

// Transpiles screens from "src/screens/".
gulp.task("screens_prod", screenMiddleware.gulp({env: "prod"}));

// This is called from '_predeploy', when the 'aek deploy' command is used.
gulp.task("build", ["webpack_prod", "css_prod", "screens_prod"]);

// The predeloy task is triggered from `aek deploy` command.
gulp.task("_predeploy", predeploy);

// This must be exported for use with aek-cli.
module.exports = gulp;
