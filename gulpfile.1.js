var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var config = {
    bootstrapDir: 'bower_components/bootstrap-sass',
    publicDir: 'src',
};

gulp.task('css', function() {
    return gulp.src('src/scss/*.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});



// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest(config.publicDir + "/css"));
//         //.pipe(browserSync.stream());
// });


// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(gulp.dest(config.publicDir + "/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);

//gulp.task('default', ['css', 'fonts', 'serve'])