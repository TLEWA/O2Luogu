const gulp = require('gulp'); // 引入 gulp
const concat = require('gulp-concat'); // 文件合并操作
const fileInclude = require('gulp-file-include'); // 文件导入操作
const sourcemaps = require('gulp-sourcemaps'); // 生成 sourcemap 文件
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

style_header = [
	'styles/header.styl', // UserStyle Header
	"styles/Defines/*.styl", // 宏定义变量
	"styles/Tools/variable.styl", // 变量相关库函数
	"styles/Tools/function.styl", // 函数相关库函数
	"styles/Tools/random.styl", // 随机数相关函数
	"styles/Tools/list.styl", // 哈希表相关函数
	"styles/Tools/string.styl", // 字符串相关函数
	"styles/Tools/class.styl", // 类相关库函数
	"styles/Tools/*.styl",
	"styles/Class/selector.styl", // 选择器类
	"styles/Class/style_node.styl" // 样式节点
]

debug_body = ["styles/Debug/*.styl"]
style_body = []

// 连接文件而不输出 sourcemap
function link_styles(style_src) {
	return gulp.src(style_src) // 入口文件
		.pipe(sourcemaps.init()) // 初始化 sourcemap
		.pipe(concat('all.styl'))
		.pipe(fileInclude({
			prefix: '@@',  // 设置文件导入标记的前缀
			basepath: 'lib'  // 定义基础路径
		}))
		.pipe(gulp.dest('./merged')) // 输出目录
		// 连接文件而不输出 sourcemap
}

function getStyleStream() {
	const argv = yargs(hideBin(process.argv))
		.option('mode', {
			alias: 's',
			type: 'array',
			choices: ['debug', 'style'],
			default: ['style'],
			description: '选择编译模式(debug, style)'
		})
		.argv;
	
	const selectedSources = style_header.slice();
	
	if (argv.src.includes('debug')) {
		selectedSources.push(...debug_body);
	}
	if (argv.src.includes('style')) {
		selectedSources.push(...style_body);
	}
	
	return link_styles(selectedSources);
}

gulp.task('styles', getStyleStream);

// 连接文件并输出 sourcemap
gulp.task('styles_sourcemap', function () {
	// 调用 styles 任务并接续 pipe 输出 sourcemap
	return getStyleStream()
		.pipe(sourcemaps.write('./maps')) // 输出 sourcemap 文件
		.pipe(gulp.dest('./merged')); // 输出目录
});
