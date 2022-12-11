const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');

gulp.task('clean', () => {
    return gulp.src('dist', {read: true})
    .pipe(clean());
});

gulp.task('assets', () => {
    return gulp.src('src/assets/**')
    .pipe(gulp.dest('dist/assets'))
})

gulp.task('index', () => {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('templates', () => {
    return gulp.src(['src/templates/*.html'])
    .pipe(gulp.dest('dist/templates'))
})

gulp.task('styles', () => {
    return gulp.src('src/styles/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', () => {
    return gulp.src([
        'src/scripts/menu.js',
        'src/scripts/router.js',
        'src/scripts/gallery.js',
        'src/scripts/main.js',
        ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.series('index', 'templates', 'scripts', 'assets', 'styles', ))

gulp.task('watch', () => {
    gulp.watch('src/index.html', gulp.series('index'))
    gulp.watch('src/templates/*.html', gulp.series('templates'))
    gulp.watch('src/scripts/*.js', gulp.series('scripts'))
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'))
    gulp.watch('src/assets/**', gulp.series('assets'))
})

gulp.task('webserver', () => {
    return gulp.src('dist')
    .pipe(webserver({
        fallback: 'index.html',
        livereload: true,
        open: true
    }))
})

gulp.task('default', 
    gulp.series('build','webserver','watch')
)