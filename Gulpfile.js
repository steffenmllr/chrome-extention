var gulp             = require('gulp');
var sass             = require('gulp-sass');
var livereload       = require('gulp-livereload');


//
// SASS Tasks
//
gulp.task('sass', function() {
    gulp.src('./scss/screen.scss')
        .pipe(sass({
            includePaths: ['./scss'],
            outputStyle: 'nested',
            sourceComments: 'normal'
        }))
        .on('error', function(err){
            console.log(err);
        })
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});


//
// Watch task
//
gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    livereload.listen();
});


//
// Default Task
//
gulp.task('default', ['sass', 'watch',], function () {
});
