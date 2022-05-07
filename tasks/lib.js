import gulp from "gulp";
import args from "./lib/args";

const ENV = args.production ? "production" : "development";

gulp.task("lib", (cb) => {
  return gulp
    .src("app/lib/**", { base: "app" })
    .pipe(gulp.dest("./dist/chrome/"));
});
