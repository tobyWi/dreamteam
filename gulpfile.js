var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate');
	gulpLiveServer = require('gulp-live-server'),
	jshint = require('gulp-jshint');

gulp.task('jshint', function() {
	return gulp.src('public/assets/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// AUTO START & REFRESH SERVER.  Type "gulp" instead of "node server"

gulp.task('server', function() {
	var server = gulpLiveServer.new('server.js');
	server.start();

	gulp.watch('server.js', function(file) {
		server.start.apply(server);
	});

	//  AUTO REFRESH PAGE.

	gulp.watch(['public/**/*.css', 'public/**/*.html', 'public/**/*.js'], function(file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('uglify', function() {
	return gulp.src('public/assets/js/scripts.js')
		.pipe(ngAnnotate())
		.pipe(gulp.dest('public/dist'))
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));

});

gulp.task('watch', function() {
	gulp.watch('*.js', ['ngAnnotate', 'rename', 'uglify']);
});


// FINAL

gulp.task('default', ['jshint', 'uglify', 'server', 'watch']);

