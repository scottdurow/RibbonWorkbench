/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});
