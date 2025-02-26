const fs = require('fs');
const { execSync } = require('child_process');

function test() {
    try {
        // 编译test.styl到output/compiled.css
        execSync('npx stylus debug/test/stylus_compile_test/test.styl -o debug/test/stylus_compile_test/output/compiled.css');
        
        // 读取生成文件和标准文件
        const generated = fs.readFileSync('debug/test/stylus_compile_test/output/compiled.css', 'utf8');
        const standard = fs.readFileSync('debug/test/stylus_compile_test/standard_output/compiled.css', 'utf8');
        
        // 精确比较文件内容
        if (generated !== standard) {
            throw new Error('CSS输出与标准结果不一致');
        }
    } catch (error) {
        console.error('测试执行出错:', error);
        throw error;
    }
}

module.exports = test;