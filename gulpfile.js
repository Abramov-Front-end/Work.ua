const gulp = require('gulp')

const sass = require('gulp-sass')
const clear = require('gulp-minify-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

const webpack = require('webpack-stream')
const babel = require('gulp-babel')

const path = {
    base: 'public',
    src: 'src'
}

path.styles = { folder: path.base + '/css' }
path.styles.scss =  path.src + '/scss'
path.styles.scssFiles =  path.styles.scss + '/**/*.scss'

path.js = { folder: path.base + '/js' }
path.js.temp = path.src + '/js'
path.js.tempFiles = path.js.temp + '/**/*.js'

//Compile styles
const compileStyles = () => (
    gulp.src( path.styles.scssFiles )
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( clear({
            processImport: false
        }))
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest(path.styles.folder) )
)

const compileJs = () => (
    gulp.src( path.js.temp + '/main.js' )
        //.pipe( babel() )
        .pipe( webpack({
            mode: 'development',
            output: {
                filename: 'app.js'
            }
        }) )
        .pipe( gulp.dest(path.js.folder) )
)

//Gulp tasks
gulp.task('compile-css', compileStyles)
gulp.task('compile-js', compileJs)

//Watcher
gulp.task('watch', function(done) {
    gulp.watch(path.styles.scssFiles, gulp.series('compile-css'))
    gulp.watch(path.js.tempFiles, gulp.series('compile-js'))

    done();
});


