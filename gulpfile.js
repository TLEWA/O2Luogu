const gulp = require('gulp'); // 引入 gulp
const concat = require('gulp-concat'); // 文件合并操作
const fileInclude = require('gulp-file-include'); // 文件导入操作

gulp.task('styles', function () {
  return gulp.src([
      'styles/header.styl',
      "styles/Defines/*.styl",
      "styles/Tools/function.styl",
      "styles/Tools/random.styl",
      "styles/Tools/list.styl",
      "styles/Tools/string.styl",
      "styles/Tools/selector.styl",
      "styles/Tools/*.styl"
    ]) // 入口文件
    .pipe(concat('all.styl'))
    .pipe(fileInclude({
      prefix: '@@',  // 设置文件导入标记的前缀
      basepath: 'lib'  // 定义基础路径
    }))
    .pipe(gulp.dest('./merged')); // 输出目录
});
