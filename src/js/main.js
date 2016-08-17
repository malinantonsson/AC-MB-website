
var site = {
  init: function() {
    var self = this;
    var navOpen = 'nav-is-open';

    $('#video').YTPlayer({
      fitToBackground: true,
      videoId: 'AHDATlqQcZQ'
    });

    var currentDateTime = new moment();
    /*window.moment().format();*/
    var jun = moment("2014-06-01T12:00:00Z");
    console.log(jun);
    this.timeZones();

    this.ui.navToggle.addEventListener('click', function(e) {
      self.handleNav(navOpen);
    }, false);

  },
  ui: {
    navToggle: document.getElementById('toggle-nav'),
    body: document.getElementsByTagName('body')[0],
    nav: document.getElementById('main-navigation')
  },
  handleNav: function(open) {  
    $(this.ui.body).toggleClass(open);
  },
  timeZones: function() {
    //console.log(window);
    var now = moment().toObject();; // current timestamp, using your machine's time zone
    //var nowLA = now.tz('America/Los_Angeles'); // converted to LA time zone
    //var nowNY = now.tz('America/New_York'); // converted to NY time zone
    //var jun = window.moment("2014-06-01T12:00:00Z");
    //console.log(jun);
    console.log(now);
    console.log(nowLA);
    console.log(nowNy);
  }




};


$( document ).ready(function() {
  site.init();
});

