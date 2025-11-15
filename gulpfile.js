let gulp = require('gulp');
let gulpConnect = require('gulp-connect');
let gulpminifyCSS = require('gulp-minify-css');
//for javascript type ES6(uglify  = minify-JS)
let gulpminifyUglify = require('gulp-uglify-es').default;
let gulpminifyConcat = require('gulp-concat');
let gulpminifyHTML = require('gulp-htmlmin');
let clean = require('gulp-clean');

//--- ada script di sini ---

gulp.task('server', async function(){

    gulpConnect.server({
		port: "3100",
        root: "dist",
        livereload: true
    });
});

//task minify
gulp.task('minify-CSS', async function(){
	gulp.src('./src/css/*.css')
		.pipe(gulpminifyCSS({
			compatibility:'ie8'
			}))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulpConnect.reload());
});	
	
gulp.task('minify-JS', async function () {
    return gulp.src('./src/js/*.js')
        .pipe(gulpminifyConcat('bundle.js'))
        .pipe(gulpminifyUglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-HTML', async function(){
	gulp.src('./src/html/*.html')
	.pipe(gulpminifyHTML({
		collapseWhitespace: true
		}))
	.pipe(gulp.dest('dist'))
	.pipe(gulpConnect.reload());
});

gulp.task('clean', function(){
	return gulp.src('dist',{
		read:false,
		allowEmpty:true
	}).pipe(clean());
});

//task watch
gulp.task('watch',async function(){
	gulp.watch('./src/html/*.html',gulp.series('minify-HTML'))
	gulp.watch('./src/js/*.js', gulp.series('minify-JS'))
	gulp.watch('./src/css/*.css',gulp.series('minify-CSS'))
	});

//gulp task default
gulp.task('build',  gulp.series('clean', 'minify-CSS', 'minify-JS', 'minify-HTML'));
gulp.task('default', gulp.series('watch', 'server'));

