var gulp = require("gulp");
var del = require("del");
var ts = require("gulp-typescript")

gulp.task('default', ['watch', 'scripts']);

gulp.task('scripts', function() {
    return gulp.src("src/**/*.ts")
        .pipe(
            ts({
                declaration: true,
                noExternalResolve: true
            })
        )
        .pipe( gulp.dest('dist') );
});

gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});