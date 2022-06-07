
const gulp = require('gulp');
const { src, dest, parallel } = gulp;
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');



function css() {
    return src('../src/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(minifyCSS())
        .pipe(rename('bcvvui.css'))
        .pipe(gulp.dest('../dist/styles'));
}

function font() {
    return src('../src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
}

exports.font = font;
exports.css = css;
exports.default = parallel( css, font);


//
// const gulp = require('gulp');
// const cleanCSS = require('gulp-clean-css');
// const less = require('gulp-less');
// const rename = require('gulp-rename');
// const autoprefixer = require('gulp-autoprefixer');
// const { series } = require('gulp');
// // 编译less
// gulp.task('css', series('css',function () {
//     gulp.src('../src/styles/index.less')
//         .pipe(less())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'ie > 8']
//         }))
//         .pipe(cleanCSS())
//         .pipe(rename('bcvvui.css'))
//         .pipe(gulp.dest('../dist/styles'));
// }));
//
// // 拷贝字体文件
// gulp.task('fonts',series('fonts',function () {
//     gulp.src('../src/styles/common/iconfont/fonts/*.*')
//         .pipe(gulp.dest('../dist/styles/fonts'));
// }));
//
// gulp.task('default', ['css', 'fonts']);

