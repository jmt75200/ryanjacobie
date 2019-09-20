// var gulp = require('gulp');
// var sass = require('gulp-sass');
// gulp.task('sass', function () {
//   return gulp.src(sassInput)
//   .pipe(sass({ errLogToConsole:true }))
//   .pipe(gulp.dest(sassOutput));
// });

// gulp.task('watch', function () {
//   gulp.watch(sassInput, ['sass']);
// });

// gulp.task('default', ['sass', 'watch']);

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
//to minify and add autoprefixer sass
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
//to concat and minify js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var sassInput = "./src/sass/*.scss";
var sassOutput = "./compartments/assets/styles";

//SASS Task
var sassOptions = {
  errToConole: true,
  outputStyle: 'expanded'
}
var autoprefixerOptions = {
  browsers:['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('buildSass', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)).on('error', sass.logError)
    // .pipe(minCss())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput));
});

//JS task
var jsInput = "./src/js/**/*.js";
var jsOutput = "./compartments/assets/scripts";

gulp.task('buildJs', function () {
  return gulp
    .src(jsInput)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest(jsOutput));
});

gulp.task('watch', function () {
  gulp.watch(sassInput, gulp.parallel(['buildSass']))
    .on('change', function (event) {
      console.log('File:' + event.path + ' was ' + event.type + ' running task...');
    });
  gulp.watch(jsInput, gulp.parallel(['buildJs']))
    .on('change', function (event) {
      console.log('File:' + event.path + ' was ' + event.type + ' running task...');
    });
});

gulp.task('default', gulp.parallel(['watch', 'buildSass', 'buildJs']));