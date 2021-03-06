var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('connect'),
    fs = require('fs'),
    serveStatic = require('serve-static'),
    jade = require('gulp-jade'),
    data = require('gulp-data'),
    imagemin = require('gulp-imagemin'),
    path = require("path"),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    stylus = require('gulp-stylus'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    filter = require('gulp-filter'),
    deploy = require('gulp-gh-pages'),
    vinylYamlData = require('vinyl-yaml-data'),
    deepExtend = require('deep-extend-stream'),
    nib = require('nib'),
    obfuscate = require('gulp-obfuscate'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    locals = {};

gulp.task('yaml',function(){
  locals = {};
 
  return gulp.src('./src/data/*.yaml')
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals));
});

gulp.task('jade', ["yaml"], function(){
  gulp.src('./src/*.jade')
    .pipe(data( function(file) {
      return locals;
    }))
    .pipe(jade({ pretty: true }))
    .on('error', console.log)
    .pipe(gulp.dest('./out/'))
    .pipe(livereload());
});

gulp.task('scripts',function(){
  streamqueue({ objectMode: true },
    gulp.src(mainBowerFiles())
      .pipe(filter('*.js')),
    gulp.src('./src/assets/scripts/*.js'),
    gulp.src('./src/assets/scripts/*.coffee')
      .pipe(coffee({bare: true}))
      .on('error', console.log),
    gulp.src('./src/blocks/**/*.coffee')
      .pipe(coffee())
      .on('error', console.log),
    gulp.src('./src/blocks/**/*.js')
  ).pipe(concat("project.js"))
  // .pipe(uglify())
  // .pipe(obfuscate({ replaceMethod: obfuscate.ZALGO }))
  .pipe(gulp.dest('./out/assets/'))
  .pipe(livereload());
});

gulp.task('styles', function() {
  var stylFilter = filter('*.styl', { restore: true });
  streamqueue({ objectMode: true }, 
    gulp.src(mainBowerFiles())
      .pipe(filter('*.css')),
    gulp.src('./src/assets/styles/*')
      .pipe(stylFilter)
      .pipe(stylus({
        use: nib(),
        paths: ['node_modules', 'src/globals'],
        import: ["nib", "variables", "mixins"],
        compress: true,
        'include css': true
      }))
      .on('error', console.log)
      .pipe(stylFilter.restore),
    gulp.src('./src/blocks/**/*.styl')
      .pipe(stylus({
        use: nib(),
        paths: ['node_modules', 'src/globals'],
        import: ["nib", "variables", "mixins"],
        compress: true,
        'include css': true
      }))
      .on('error', console.log),
    gulp.src('./src/blocks/**/*.css')
  ).pipe(concat("project.css"))
  // .pipe(cssmin())
  .pipe(gulp.dest('./out/assets/'))
  .pipe(livereload());
});


gulp.task('fonts', function() {
    gulp.src('./src/assets/f/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest('./out/assets/f/'));
});

gulp.task('imagemin',function(){
   gulp.src('./src/assets/i/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./out/assets/i/'));
});

gulp.task('server', function() {
    connect()
      .use(require('connect-livereload')())
      .use(serveStatic(__dirname + '/out'))
      .listen('8080');
    console.log('Сервер работает по адресу http://localhost:8080');
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch(['src/blocks/**/*.jade', 'src/layouts/*.jade', 'src/*.jade', 'src/data/*.yaml' ] ,['jade']);
    gulp.watch([ 'src/blocks/**/*.coffee', 'src/assets/scripts/*.coffee' ],['scripts']);
    gulp.watch([ 'src/blocks/**/*.styl', 'src/assets/styles/*.styl' ],['styles']);
    gulp.start('server');
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch(['src/blocks/**/*.jade', 'src/layouts/*.jade', 'src/*.jade', 'src/data/*.yaml' ] ,['jade']);
    gulp.watch([ 'src/blocks/**/*.coffee', 'src/assets/scripts/*.coffee' ],['scripts']);
    gulp.watch([ 'src/blocks/**/*.styl', 'src/assets/styles/*.styl' ],['styles']);
    gulp.start('server');
});

gulp.task('generate', ["jade", "imagemin", "scripts", "styles", "fonts" ], function(){
    return true;
});

gulp.task('default',[ 'generate', 'watch' ]);

gulp.task('min-files', function() {
  gulp.src("./out_min/assets/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('./out_min/assets/'))
  gulp.src("./out_min/assets/*.css")
    .pipe(cssmin())
    .pipe(gulp.dest('./out_min/assets/'))    

});

gulp.task('deploy', ['min-files'], function () {
  return gulp.src("./out/**/*")
    .pipe(deploy())
});



function combineJSONFiles(dir) {
    var files = fs.readdirSync(dir),
        data = {};

    for (var i in files) {
      data[ path.basename( files[i], ".json" )] = JSON.parse( fs.readFileSync( dir + "/" + files[i] ));
    };
    
    return data;
}