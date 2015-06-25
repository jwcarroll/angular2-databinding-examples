/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins
To learn more visit: https://github.com/gulpjs/gulp/blob/master/docs/README.md
*/
'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var _ = require('lodash');
var packages = require('./package.json');
var app = './app';
var releaseDir = './wwwroot/app';

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['copy-deps', 'copy-templates', 'scripts']);

gulp.task('copy-deps', function() {
   _.forEach(packages.dependencies, function(val, key){
      gulp.src('./node_modules/' + key + '/**/*')
          .pipe(gulp.dest(releaseDir + '/lib/' + key));
   });
});

gulp.task('copy-templates', function() {
    gulp.src(app + '/**/*.html')
        .pipe(gulp.dest(releaseDir));   
});

gulp.task("scripts", function(){
  var tsProj = ts.createProject(app + '/tsconfig.json', {
    typescript: require('typescript')
  });
  
  var tsResult = gulp.src(app + '/**/*.ts')
                 .pipe(ts(tsProj));
                 
  return tsResult.js.pipe(gulp.dest(releaseDir));
});