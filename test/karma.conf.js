// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-12-13 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/jquery-countTo/jquery.countTo.js',
      'bower_components/jquery.countdown/dist/jquery.countdown.js',
      'bower_components/jqvmap/dist/jquery.vmap.min.js',
      'bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js',
      'bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.js',
      'bower_components/jquery.scrollbar/jquery.scrollbar.js',
      'bower_components/jquery-appear/src/jquery.appear.js',
      'bower_components/Swiper/dist/js/swiper.js',
      'bower_components/jquery.stellar/jquery.stellar.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angularjs-slider/dist/rzslider.js',
      'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-video-bg/angular-video-bg.min.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
