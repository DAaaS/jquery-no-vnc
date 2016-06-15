var gulp = require('gulp');

gulp.task('serve', ['build', 'watch'], function(){
  var gls = require('gulp-live-server');
  var server = gls(['app.js']);
  gulp.watch(['dist/jquery-no-vnc.js'], function (file) {
    server.start.bind(server)();
    server.notify.bind(server)(file);
  });
  server.start();
});

gulp.task('watch', function(){
  gulp.watch('src.js', ['build']);
});

gulp.task('build', function(){
	var scripts = [	
		"util.js",
		"webutil.js",
		"base64.js",
		"websock.js",
		"des.js",
        "keysymdef.js",
        "keyboard.js",
        "input.js",
        "display.js",
        "jsunzip.js",
        "rfb.js", 
        "keysym.js"
    ];

    var buffer = [];
    var fs = require('fs');

    function build(){
    	if(scripts.length > 0){
	    	var script = scripts.shift();
			fs.readFile('bower_components/no-vnc/include/' + script, 'UTF8', function (err,data) {
				buffer.push(data);
				build();
			});
		} else {
			fs.readFile('src.js', 'UTF8', function (err,data) {
				fs.writeFile("dist/jquery-no-vnc.js", data.replace(/\/\/no_vnc_scripts/, buffer.join("\n"))); 

        var uglify = require('gulp-uglify');
        var rename = require('gulp-rename');

        gulp.src('dist/jquery-no-vnc.js').pipe(uglify({mangle: true})).pipe(rename('jquery-no-vnc.min.js')).pipe(gulp.dest('dist/'));
			});
		}
    }

    build();
});

gulp.task('default', ['build']);
