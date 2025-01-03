const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('styles', function () {
  return gulp.src([
      'styles/header.styl',
      "styles/Tools/*"
    ]) // 入口文件
    .pipe(concat('all.styl'))
    .pipe(gulp.dest('./merged')); // 输出目录
});