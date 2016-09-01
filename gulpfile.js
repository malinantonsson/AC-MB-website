/* libs */
var gulp = require('gulp');
var gutil = require('gulp-util');
var ignore = require('gulp-ignore');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var sass = require('gulp-sass');
var argv = require('yargs').argv;
var path = require('path');
var svg2png    = require('gulp-svg2png');
var svgSymbols = require('gulp-svg-symbols');
var svgSprite = require('gulp-svg-sprite');

var contentful = require('contentful');
var fm = require('front-matter');
var path = require('path');
var fs = require('fs.extra');
var marked = require('marked');
var dateFilter = require('nunjucks-date-filter');



var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

/* vars */
var appPath = './src';
var distPath = './dist/';

var sassSrc = appPath + '/scss/*.scss';
var cssVendor = appPath + '/scss/vendor/*.css';
var sassDist = distPath + '/css/';
var cssVendorDist = distPath + '/css/';

var fontsSrc = appPath + '/fonts/**/*.{ttf,otf}';
var fontsDist = sassDist + '/fonts/';

var imagesSrc = appPath + '/images/**/*.{png,jpg}';
var imagesDist = distPath + '/images/';

var iconSrc = appPath + '/icons/**/*.svg';
var iconDist = distPath + '/icons/';
var iconPngDist = distPath + '/icons/png/';

var jsSrc = appPath + '/js/*.js';
var jsVendorSrc = appPath + '/js/vendor/*.js';
var jsDist = distPath + '/js/';
var jsVendorDist = distPath + '/js/vendor/';
var mapsDataSrc = appPath + '/js/mapsdata.json';
var mapsDataDist = distPath + '/js/';

var dataSrc = appPath + '/data/*.json';

var templatesSrc = appPath + '/templates/';
var partialsSrc = templatesSrc + '/partials/';

var partialsApiSrc = templatesSrc + '/partials-api/';

var pagesPath = appPath + '/pages/**/*.nunjucks';
var pagesDist = distPath;


var config = {
  defaultPort: 3000,
  supportedBrowsers: [
    'ie >= 9',
    'last 1 Firefox versions',
    'last 1 Chrome versions',
    'Safari >= 6',
    'iOS >= 6',
    'ChromeAndroid >= 4.2'
  ],
  version: require('./package.json').version,
  minify: argv.minify || false
};


var client = contentful.createClient({
  space: 'k3gh61z1i0f4',
  accessToken: 'eaf78d30eb593c6981143514ad5ba31442b577b372a08b1ca7ec2e0ec0e1e1b9'
});

// Get the Acts data from the cloud CMS and stash it locally
gulp.task('get:portfolio', function() {

    client.getEntries({'content_type':'portfolio'})
      .then(function (entries) {
        //console.log(entries.total);
        //console.log(entries);

       /* console.log(entries.items[0].fields.text);
        console.log(entries.items[0].fields.relatedPortfolioItems);

*/
          /*console.log('item');
          console.log(entries.items[0].fields.relatedPortfolioItems[0].fields.relatedPortfolioItems));
*/

          //console.log(entries.items[0]);
          //
          var portfolioListing = {}
          var portfolioItems = [];
          var featuredPortfolio;

          var mapObject = [];

          var dataObject = [];
          //Get each item (i.e each portfolio page)
          for (var item = 0; item < entries.items.length; item++) {
            
            //get the page title and format for url structure
            var pageName = entries.items[item].fields.text.toLowerCase().replace(/\s+/g, '-');

            var portfolioItem = {
              text: entries.items[item].fields.text,
              url: pageName + '.html',
              teaserImage: entries.items[item].fields.teaserImage,
              location: entries.items[item].fields.location,
              heroImage: entries.items[item].fields.heroImage,
              bodycopyHeadline: entries.items[item].fields.bodycopyHeadline,
              bodycopy: entries.items[item].fields.bodycopy,
              acquisitionDate: entries.items[item].fields.acquisitionDate,
              value: entries.items[item].fields.value,
              numberOfStores: entries.items[item].fields.numberOfStores,
              keyOccupants: entries.items[item].fields.keyOccupants,
              bodyImage: entries.items[item].fields.bodyImage,
              bodyImageFullWidth: entries.items[item].fields.bodyImageFullWidth,
              supportingImage1: entries.items[item].fields.supportingImage1,
              supportingImage2: entries.items[item].fields.supportingImage2,
              supportingImage3: entries.items[item].fields.supportingImage3,
              quote: entries.items[item].fields.quote,
              quoteAuthor: entries.items[item].fields.quoteAuthor,
              featuredPortflio: entries.items[item].fields.featuredPortflio,
              relatedPortfolioItems: [
              {
                heroImage: entries.items[item].fields.relatedPortfolioItems[0].fields.heroImage,
                text: entries.items[item].fields.relatedPortfolioItems[0].fields.text,
                location: entries.items[item].fields.relatedPortfolioItems[0].fields.location,
                url: entries.items[item].fields.relatedPortfolioItems[0].fields.text.toLowerCase().replace(/\s+/g, '-') + '.html',
                teaserImage: entries.items[item].fields.relatedPortfolioItems[0].fields.teaserImage
              },
              {
                heroImage: entries.items[item].fields.relatedPortfolioItems[1].fields.heroImage,
                text: entries.items[item].fields.relatedPortfolioItems[1].fields.text,
                location: entries.items[item].fields.relatedPortfolioItems[1].fields.location,
                url: entries.items[item].fields.relatedPortfolioItems[1].fields.text.toLowerCase().replace(/\s+/g, '-') + '.html',
                teaserImage: entries.items[item].fields.relatedPortfolioItems[1].fields.teaserImage
              }
             ],
             tagsLocation: entries.items[item].fields.tagsLocation,
             
             mapName: entries.items[item].fields.mapName,
             mapLocation: entries.items[item].fields.mapLocation,
             mapLat: entries.items[item].fields.mapLat,
             mapLng: entries.items[item].fields.mapLng,
             mapPreviewImage: entries.items[item].fields.mapPreviewImage
            };

            var dataItem = {
              name: entries.items[item].fields.mapName,
              location: entries.items[item].fields.mapLocation,
              lat: entries.items[item].fields.mapLat,
              lng: entries.items[item].fields.mapLng,
              image: entries.items[item].fields.mapPreviewImage.fields.file.url,
              url: portfolioItem.url,
              bounds: {
                start: {
                  lat: entries.items[item].fields.mapLat,
                  lng: entries.items[item].fields.mapLng
                }, 
                end: {
                  lat: entries.items[item].fields.mapLat,
                  lng: entries.items[item].fields.mapLng
                }
              }
            };

            portfolioItems.push(portfolioItem);

            mapObject.push(dataItem);

            if(portfolioItem.featuredPortflio) {
              featuredPortfolio = {
                url: portfolioItem.url,
                text: portfolioItem.text,
                heroImage: portfolioItem.heroImage,
                location: portfolioItem.location
              };
            }



            //console.log(JSON.stringify(entries.items[item].fields));
            //create a json file for each itme
            fs.writeFileSync(appPath + '/data/portfolio/' + pageName + '.json', JSON.stringify(portfolioItem));
            //copy the project base template and create a new nunjucks file for each project 
            fs.copy(appPath + '/pages/portfolio/portfolio-base.nunjucks', appPath + '/pages/portfolio/' + pageName + '.nunjucks', { replace: true }, function (err) {
              if (err) {
                // i.e. file already exists or can't write to directory 
                throw err;
              }
            });
            dataObject.push(entries.items[0].fields);
          }
          //console.log(portfolioItems);
          console.log(mapObject);

          portfolioListing.portfolioItems = portfolioItems;
          portfolioListing.featuredPortfolio = featuredPortfolio;

          //create a json file for portfolio listing
          fs.writeFileSync(appPath + '/data/portfolio/index.json', JSON.stringify(portfolioListing));


          fs.writeFileSync(appPath + '/js/mapsdata.json', JSON.stringify(mapObject));
        // log the title for all the entries that might have it
        // JUST FOR DEV

      })

});

gulp.task('get:homepage', function() {

    client.getEntries({'content_type':'homepage'})
      .then(function (entries) {
          var dataObject = {};
          //Get each item
          for (var item = 0; item < entries.items.length; item++) {

            var video = {
              videoId: entries.items[item].fields.videoId,
              videoImage: entries.items[item].fields.videoImage
            }

            dataObject.video = video;

            var portfolioItems = [];

            //get each featured portfolio
            for(var portfolio = 0; portfolio < entries.items[item].fields.featuredPortfolio.length; portfolio++) {

              var pageName = entries.items[item].fields.featuredPortfolio[portfolio].fields.text.toLowerCase().replace(/\s+/g, '-');

              var portfolioItem = {
                text: entries.items[item].fields.featuredPortfolio[portfolio].fields.text,
                url: pageName + '.html',
                location: entries.items[item].fields.featuredPortfolio[portfolio].fields.location,
                heroImage: entries.items[item].fields.featuredPortfolio[portfolio].fields.heroImage
              };
              
              portfolioItems.push(portfolioItem);

            }
            dataObject.portfolioItems = portfolioItems;
            
            //get the page title and format for url structure
            fs.writeFileSync(appPath + '/data/index.json', JSON.stringify(dataObject));
          }
      })

});


function getDataForFileApi(file) {
  filename = file.relative.replace('.nunjucks', '');

  return require('./src/api/' + filename + '.json');
}

var manageEnvironment = function(environment) {
  environment.addFilter('slug', function(str) {
    return str && str.replace(/\s/g, '-', str).toLowerCase();
  });

  environment.addFilter('date', dateFilter);

  environment.addFilter('md', function(value ,stripPara) {
    var result;
    stripPara = stripPara !== false || undefined;
    try {
      result = marked(value).trim();
      if (stripPara) {
        result = result.replace(/^<p>|<\/p>$/g, '');
      }
      return result;
    } catch (e) {
      console.error('Error processing markdown:', e);
      return value;
    }
  });

  environment.addGlobal('globalTitle', 'My global title')
}

gulp.task('nunjucks:api', function() {

  // Gets .html and .nunjucks files in pages
  return gulp.src(appPath + '/pages/portfolio/the-burlington-arcade.nunjucks')
  .pipe(data(require(appPath + '/api/portfolio/the-burlington-arcade.json')))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      manageEnv: manageEnvironment,
      path: [templatesSrc]
    }))
  // output files in app folder
  .pipe(gulp.dest(pagesDist))
});

gulp.task('setWatch', function() {
  config.isWatching = true;
});




var svgConfig = {
  svg: {
    namespaceClassnames: false
  },
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg'
    }
  }
};

gulp.task('copy-icons', function() {
  gulp.src(iconSrc)
      .pipe(gulp.dest(iconDist));
});

gulp.task('icons', function() {
  gulp.src(iconSrc)
      .pipe(svgSprite(svgConfig))
      .pipe(gulp.dest(iconDist));
});

gulp.task('images', function() {
  gulp.src(imagesSrc)
      .pipe(gulp.dest(imagesDist));
});


// Clean site directory
gulp.task('clean', del.bind(null, [distPath], {dot: true}));

gulp.task('styles', function() {
  gulp.src(sassSrc)
  	.pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass()) 
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer 
    .pipe(sourcemaps.write()) // Writing sourcemaps 
    .pipe(gulp.dest(sassDist)) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copy-styles', function() {
  gulp.src(cssVendor)
    .pipe(gulp.dest(cssVendorDist)) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copy-fonts', function() {
  gulp.src(fontsSrc)
    .pipe(gulp.dest(fontsDist)) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

var scriptsFinish = lazypipe()
  .pipe(gulp.dest, jsDist)
  .pipe(function () {
    return $.if(config.minify, $.uglify());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest(jsDist));
  });

// Lint and build scripts
gulp.task('scripts', function() {
  return gulp.src(jsSrc)
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.jshint()))
    .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.concat('scripts.js'))
    .pipe(scriptsFinish());
});

gulp.task('copy-scripts', function() {
  return gulp.src(jsVendorSrc)
    .pipe(gulp.dest(jsVendorDist));
});

gulp.task('copy-data', function() {
  return gulp.src(mapsDataSrc)
    .pipe(gulp.dest(jsDist));
});

function getDataForFile(file) {
  filename = file.relative.replace('.nunjucks', '');

  return require('./src/data/' + filename + '.json');
}
 
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(pagesPath)
  .pipe(data(getDataForFile))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      manageEnv: manageEnvironment,
      path: [templatesSrc]
    }))
  // output files in app folder
  .pipe(gulp.dest(pagesDist))
});

gulp.task('setWatch', function() {
  config.isWatching = true;
});

// Development task
gulp.task('dev', ['default', 'setWatch'], function() {
  browserSync({
    port: argv.port || config.defaultPort, //default: 3000
    server: { baseDir: distPath},
    ui: {
      port: argv.port + 5000 || config.defaultPort + 5000, //default: 8000
      weinre: { port: argv.port + 6092 || config.defaultPort + 6092 } //default: 9092
    },
    notify: false,
    logLevel: 'silent' //other oprions: info, debug
  });

  gulp.watch([sassSrc], ['styles', reload]);
  gulp.watch([sassSrc + '/**/*.scss'], ['styles', reload]);
  gulp.watch([templatesSrc + '**/*.nunjucks'], ['nunjucks', reload]);
  gulp.watch([pagesPath], ['nunjucks', reload]);
  gulp.watch([jsSrc], ['scripts', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence([
      'styles',
      'copy-styles',
      'copy-fonts',
      'icons',
      'copy-icons',
      'images',
      'scripts',
      'copy-scripts',
      'copy-data',
      'nunjucks'
    ], cb);
});