var gulp = require('gulp');
var optimizeJs = require('gulp-optimize-js');

gulp.task('optimize-js', function() {
	return gulp.src(['dist/curry.js', 'dist/curry.min.js'])
		.pipe(optimizeJs())
		.pipe(gulp.dest('dist'));
});
