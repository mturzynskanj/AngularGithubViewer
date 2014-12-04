/**
 * Created by mariaturzynska on 12/3/14.
 */
// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('connect', function() {
    connect.server({
        root: 'app/'
    });
});

// Default Task
gulp.task('default', ['connect']);
