const gulp        = require('gulp');
const browserify  = require('browserify');
const watchify    = require('watchify');
const source      = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

/** Bundle JavaScript sources by Watchify */
gulp.task('script', () => {
    const b= browserify({
        cache: {},
        packageCache: {},
        debug: true
    });
    const w = watchify(b);
    const bundle = () => {
        return w
            .add('./src/scripts/main.ts')
            .plugin('tsify')
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./public/'))
            .pipe(browserSync.reload({
                stream: true
            }));
    };
    w.on('update', bundle);
    return bundle();
});

/** Run Web server */
gulp.task('serve', () => {
    return browserSync.init(null, {
        server: {
            baseDir: './public/'
        },
        reloadDelay: 1000
    })
});

gulp.task('default', () => runSequence('script', 'serve'));
