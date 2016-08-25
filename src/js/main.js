
var site = {
  init: function() {
    var self = this;
    var navOpen = 'nav-is-open';

    var video = document.getElementById('video');
    if(video) {
      var videoId = video.getAttribute('data-src');
      
      $('#video').YTPlayer({
        fitToBackground: true,
        videoId: videoId
      });
    }

    var timeZones = document.getElementById('times-container');
    if(timeZones) {
      this.initTimezones();

      this.timeZones();
      setInterval(function() {
        self.timeZones();
      }, 500);
    }

    this.ui.navToggle.addEventListener('click', function(e) {
      self.handleNav(navOpen);
    }, false);

    var map = document.getElementById('map');
    if(map) {
      this.initMap(map);
    }

  },
  settings: {
    mapApi: 'AIzaSyBTNCen_4P1hvj3DGYe0eJPa7y1-0emDeQ'
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
    var nyTime = ny.format('h:mm a'); 

    var la = moment.tz(currentTime, "America/Los_Angeles");
    var laTime = la.format('h:mm a'); 

    var paris = moment.tz(currentTime, "Europe/Paris");
    var parisTime = paris.format('h:mm a'); 

    var london = moment.tz(currentTime, "Europe/London");
    var londonTime = london.format('h:mm a'); 

    this.ui.uk.innerHTML = londonTime;
    this.ui.paris.innerHTML = parisTime;
    this.ui.la.innerHTML = laTime;
    this.ui.ny.innerHTML = nyTime;
  },

  initMap: function(mapWrapper) {
    var lat = parseFloat(mapWrapper.getAttribute('data-lat'));
    var lng = parseFloat(mapWrapper.getAttribute('data-lng'));
    console.log(lat);

    var map = new google.maps.Map(mapWrapper, {
        center: {lat: lat, lng: lng},
        zoom: 15,
        styles: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#dde6e8"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ]
    });
  }

};


$( document ).ready(function() {
  site.init();
});

