'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import concat from 'gulp-concat';
import concatCss from 'gulp-concat-css';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';

// Use dart-sass as the implementation for gulp-sass
const sassCompiler = gulpSass(dartSass);

// Define tasks using Gulp 4 syntax
const handleError = (error) => {
	console.log("Babel" + error);
};

const sassTask = () => {
	return gulp.src('scss/*.scss')
		.pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
		.pipe(concat('custom.css'))
		.pipe(gulp.dest('css/'));
};

const stylesTask = () => {
	return gulp.src(['css/*.css', 'vc-elements/*/*.css'])
		.pipe(concatCss("miew.style.min.css"))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/'));
};

const scriptsTask = () => {
	return gulp.src(['js/*.js', 'vc-elements/*/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat("miew.scripts.js"))
		.pipe(gulp.dest('dist/')) // save .js
		.pipe(babel().on('error', handleError))
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/')); // save .min.js
};

const vendorsCssTask = () => {
	return gulp.src(['vendor/*/*/*.css', 'vendor/*/*.css', 'vendor/*.css'])
		.pipe(concatCss("vendors.min.css"))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/'));
};

const vendorsJsTask = () => {
	return gulp.src(['vendor/*.js', 'vendor/*/*/*.js', 'vendor/*/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat("vendors.min.js"))
		.pipe(gulp.dest('dist/')); // save .js
	// Uncomment if needed
	//.pipe(babel().on('error', handleError))
	//.pipe(terser())
	//.pipe(sourcemaps.write('./'))
	//.pipe(gulp.dest('dist/')); // save .min.js
};

const watchTask = () => {
	gulp.watch('scss/*.scss', sassTask);
	gulp.watch(['css/*.css', 'vc-elements/*/*.css'], stylesTask);
	gulp.watch(['js/*.js', 'vc-elements/*/*.js'], scriptsTask);
	gulp.watch(['vendor/*/*/*.css', 'vendor/*/*.css', 'vendor/*.css'], vendorsCssTask);
	gulp.watch(['vendor/*/*/*.js', 'vendor/*/*.js', 'vendor/*.js'], vendorsJsTask);
};

// Define default task
gulp.task('default', gulp.series(
	gulp.parallel(sassTask, scriptsTask, stylesTask, vendorsJsTask, vendorsCssTask),
	watchTask
));