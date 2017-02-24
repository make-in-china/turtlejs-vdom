
var gulp = require('gulp');

var tsconfig={
    // outFile:,
    // "noImplicitAny": true,
        // "strictNullChecks": true,
        "noImplicitThis":true,
        "alwaysStrict":true,
        "target":"es5",
        "experimentalDecorators":true,
        "skipLibCheck":true,
        declaration: true
        // "noUnusedParameters":true,
        // "noUnusedLocals":true
    }
//virtual

var fs
var moment
// var sourcemaps 
var ts 
var merge 
var del
var doTSC
function init(){
    fs=require('fs');
    moment=require('moment');
    // sourcemaps = require('gulp-sourcemaps');
    ts = require('gulp-typescript');
    merge = require('merge2');  // Requires separate installation
    del = require('del');
    doTSC=function(path,outFile){
        tsconfig.outFile=outFile;
        var tsResult=gulp.src(path)
            // .pipe(sourcemaps.init())
            .pipe(ts(tsconfig)
            );
            // tsResult.pipe(sourcemaps.init()).pipe(sourcemaps.write('../maps', {addComment: false}))
        merge([
            tsResult.js.pipe(gulp.dest('dest')),
            tsResult.dts.pipe(gulp.dest('dest'))])
    }
}
gulp.task('vdom1',function(){
    init();
    doTSC('UIHelper/export/DocumentVDOM.ts','documentVDOM.0.1.js')
});
gulp.task('vdom',function(){
    init();
    doTSC('UIHelper/export/VDOM.ts','VDOM.0.1.js')
});
gulp.task('default',function(){
    console.log(`任务列表：
    vdom      构建 VDOM.js
    vdom1     构建 documentVDOM.js`);
});