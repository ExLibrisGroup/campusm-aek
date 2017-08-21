
var gulp = require("gulp");
// var runSequence = require("run-sequence");
var aek = require("@ombiel/aek-cli");
var buildtools = require("@ombiel/aek-buildtools");
var cssMiddleware = require("@ombiel/aek-buildtools/css-middleware");
var aekGulp = buildtools.gulp;
var screenMiddleware = require("@ombiel/aek-buildtools/screen-middleware");
var predeploy = aekGulp.predeploy({gulp:gulp,buildTask:"build"});
var path = require("path");

/* ---- SETTINGS ---------- */

var runserverOptions = {
  // port:5000, // port on which your local sever will run
  // useProxy:"http://localhost:8888", // if you're network requires a proxy server
  // bypassSSLVerification:true, // if you have trouble validating SSL certificates you can switch them off - note this leaves you vulnerable to man-in-the-middle
  // logs:true // log every http request in the terminal
};

var webpackOptions = {
  srcBase:path.resolve(__dirname,"src/js/"),
  dest:path.resolve(__dirname,".build/public/js"),
  recordHash:false,
  alias:{
    "-components":"@ombiel/aek-lib/react/components",
    "-aek":"@ombiel/aek-lib"
  }
};

var cssOptions = {
  srcBase:path.resolve(__dirname,"src/css/"),
  destination:path.resolve(__dirname,".build/public/css"),
  define:{
    "aekCssPath":require.resolve("@ombiel/aek-css/index.styl")
  }
};

var screenOptions = {
  srcBase:path.resolve(__dirname,"src/screens/"),
  dest:path.resolve(__dirname,".build/screens/")
};

buildtools.webpackMiddleware.setOptions(webpackOptions);
cssMiddleware.setOptions(cssOptions);
screenMiddleware.setOptions(screenOptions);


/* ---- GULP TASKS ---------- */

gulp.task("webpack_prod",function() { return aekGulp.webpack(true,webpackOptions); });
gulp.task("css_prod",cssMiddleware.gulp(false,{}));
gulp.task("screens_prod",screenMiddleware.gulp({env:"prod"}));
gulp.task("build",["webpack_prod","css_prod","screens_prod"]);
gulp.task("auth",function() { return aek.cli.processCommand("auth",{silent:true}); });
gulp.task("runserver",["auth"],function() { return aek.cli.processCommand("runserver",runserverOptions); });

// predeloy task is triggered from `aek deploy` command
gulp.task("_predeploy",predeploy);

// default gulp task
gulp.task("default",["runserver"], function() {
  cssMiddleware.transpile(true);
  buildtools.webpackMiddleware.start();
});



// must export this for use with aek-cli
module.exports = gulp;
