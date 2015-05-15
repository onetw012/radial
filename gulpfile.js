var gulp = require('gulp'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	sass = require('gulp-ruby-sass'),
	rjs = require('gulp-requirejs'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean')
	;

gulp.task('jade', function(){
	gulp.src('jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('public/templates'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return sass('sass/')
	.on('error', function (err) {
		console.log(err.message);
	})
	.pipe(gulp.dest('public/css'))
	.pipe(connect.reload());
});

gulp.task('dev-build', function () {
	gulp.src('public/js/*.js')
	.pipe(connect.reload());
});

/*gulp.task('build', function(){
	rjs({
		baseUrl: 'js',
		name: '../bower_components/almond/almond',
		unclude: ['app'],
		insertRequire: ['app'],
		out: 'all.js',
		wrap: true
	})
	.pipe (uglify())
	.pipe (gulp.dest('public/js'))
	.pipe (connect.reload());
});*/

gulp.task('watch', function () {
	gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('sass/*.scss', ['sass']);
	gulp.watch('public/js/*.js', ['dev-build']);
});

gulp.task('connect', function () {
	connect.server({
		port: 1337,
		livereload: true,
		root: './public'
	});
});

gulp.task ('default', [/*'build',*/ 'dev-build', 'connect', 'watch']);
