var gulp = require('gulp'),
	gulpLiveServer = require('gulp-live-server'),
	jshint = require('gulp-jshint');

gulp.task('jshint', function() {
	return gulp.src('assets/js/*.js')
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
});

gulp.task('default', ['jshint', 'server']);
