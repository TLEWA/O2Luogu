const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('styles', function () {
  return gulp.src([
      'styles/header.styl',
      "styles/Defines/*.styl",
      "styles/Tools/string.styl",
      "styles/Tools/selector.styl",
      "styles/Tools/*.styl"
    ]) // 入口文件
    .pipe(concat('all.styl'))
    .pipe(gulp.dest('./merged')); // 输出目录
});