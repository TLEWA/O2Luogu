const gulp = require('gulp'); // 引入 gulp
const concat = require('gulp-concat'); // 文件合并操作
const fileInclude = require('gulp-file-include'); // 文件导入操作

gulp.task('styles', function () {
	return gulp.src([
			'styles/header.styl', // UserStyle Header
			"styles/Defines/*.styl", // 宏定义变量
			"styles/Tools/function.styl", // 函数相关库函数
			"styles/Tools/random.styl", // 随机数相关函数
			"styles/Tools/list.styl", // 哈希表相关函数
			"styles/Tools/string.styl", // 字符串相关函数
			"styles/Tools/selector.styl", // 选择器相关函数
			"styles/Tools/*.styl"
		]) // 入口文件
		.pipe(concat('all.styl'))
		.pipe(fileInclude({
			prefix: '@@',  // 设置文件导入标记的前缀
			basepath: 'lib'  // 定义基础路径
		}))
		.pipe(gulp.dest('./merged')); // 输出目录
});
