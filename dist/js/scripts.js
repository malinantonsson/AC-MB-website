
var site = {
  init: function() {
    var self = this;
    var navOpen = 'nav-is-open';

    $('#video').YTPlayer({
      fitToBackground: true,
      videoId: 'AHDATlqQcZQ'
    });

    this.initTimezones();

    this.timeZones();
    setInterval(function() {
      self.timeZones();
    }, 500);

    this.ui.navToggle.addEventListener('click', function(e) {
      self.handleNav(navOpen);
    }, false);

  },
  ui: {
    navToggle: document.getElementById('toggle-nav'),
    body: document.getElementsByTagName('body')[0],
    uk: document.getElementById('time-uk'),
    paris: document.getElementById('time-paris'),
    la: document.getElementById('time-los-angeles'),
    ny: document.getElementById('time-nyc')
  },
  handleNav: function(open) {  
    $(this.ui.body).toggleClass(open);
  },
  initTimezones: function() {
    moment.tz.add([
        'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
        'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0',
        'Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6',
        "Europe/London|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6"
      ]);
  },

  timeZones: function() {
    
    var currentTime = moment().format();

    var ny = moment.tz(currentTime, "America/New_York");
    var nyTime = ny.format('HH:mm'); 

    var la = moment.tz(currentTime, "America/Los_Angeles");
    var laTime = la.format('HH:mm'); 

    var paris = moment.tz(currentTime, "Europe/Paris");
    var parisTime = paris.format('HH:mm'); 

    var london = moment.tz(currentTime, "Europe/London");
    var londonTime = london.format('HH:mm'); 

    this.ui.uk.innerHTML = londonTime;
    this.ui.paris.innerHTML = parisTime;
    this.ui.la.innerHTML = laTime;
    this.ui.ny.innerHTML = nyTime;
  }

};


$( document ).ready(function() {
  site.init();
});

