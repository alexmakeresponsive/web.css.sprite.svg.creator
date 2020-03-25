var gulp      = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    replace   = require('gulp-replace'),
    through2  = require("through2").obj,
    // File      = require('vinyl');
    fileModule      = require('gulp-file');
    // utf8      = require('utf8');


var config = {
    mode: {
        symbol: true
    },
    shape: {
        dimension: {
        }
    }
};


gulp.task('sprite', function (cb) {
    gulp.src('./conveyor/src/*.svg')
        .pipe(svgSprite(config))
        // .pipe(replace(/transform=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/stroke=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/stroke-width=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/stroke-linecap=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/stroke-linejoin=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/fill=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        // .pipe(replace(/fill-rule=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, ''))
        .pipe(gulp.dest('./conveyor/dist'));
    cb();
});


gulp.task('names', function () {

    var filenamesArray = [];
    var filenames = {};
    var i = 1;

    gulp.src("./src/*.svg")
        .pipe(through2(
            function (file, enc, callback) {
                filenamesArray.push(file.relative.replace('.svg',''));
                filenames.names = filenamesArray;

                //utf8.encode('\uD800\uDC01');
                //utf8.encode(filenames);
                // console.log('i conuter = ', i++);

                callback();

                return fileModule('filenames.js', JSON.stringify(filenames))
                    .pipe(replace(/"/g, '\''))
                    .pipe(gulp.dest('./build'));
            }
        ));




});
