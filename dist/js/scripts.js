
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

    /*var marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: '/images/map/map.png',
      map: map
    });*/

    var projects = [
      {
       name: 'The Burlington Arcade',
       location: 'London, United Kingdom',
       lat: 51.50831,
       lng: -0.13959,
       bounds: {
          start: {
            lat: 51.50836,
            lng: -0.14260
          }, 
          end: {
            lat: 51.50836,
            lng: -0.14260
          }
        },
       url: '#',
       image: '/images/map/map-overlay-1.png'
      }
      ,
      {
       name: 'Project 2',
       location: 'London, United Kingdom',
       lat: 51.51050,
       lng: -0.13526,
       bounds: {
        start: {
          lat: 51.51101,
          lng: -0.13500
        }, 
        end: {
          lat: 51.51101,
          lng: -0.13500
        }
       },
       url: '#',
       image: '/images/map/map-overlay-1.png'
      }
    ];

    mapOverlay.prototype = new google.maps.OverlayView();

    for(var i = 0; i < projects.length; i++) {
      var project = projects[i];

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(project.lat, project.lng),
        icon: '/images/map/map.png',
        map: map
      });

      var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(project.bounds.start.lat, project.bounds.start.lng),
        new google.maps.LatLng(project.bounds.end.lat, project.bounds.end.lng));

      var overlay;
      
      overlay = new mapOverlay(bounds, project, map);
      //htmlMarker.setMap(gmap);


    }

   /* var overlay;
    USGSOverlay.prototype = new google.maps.OverlayView();

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(51.50836, -0.14260),
        new google.maps.LatLng(51.50836, -0.14260));*/

    // The photograph is courtesy of the U.S. Geological Survey.
    //var srcImage = '/images/map/map-overlay-1.png';

    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    //overlay = new USGSOverlay(bounds, srcImage, map);


    /** @constructor */
      function mapOverlay(bounds, project, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.project = project;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      mapOverlay.prototype.onAdd = function() {
        console.log('hola');

        var div = document.createElement('div');
        div.className = 'map_wrapper';

        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.className = 'map_image';
        img.src = this.project.image;

        div.appendChild(img);

        var title = document.createElement('p');
        title.className = 'map_title';
        title.textContent = this.project.name;

        var location = document.createElement('p');
        location.className = 'map_location';
        location.textContent = this.project.location;

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'map_link';
        link.textContent = 'View Project >';


        div.appendChild(title);
        div.appendChild(location);
        div.appendChild(link);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);

        //site.ui.body.appendChild(div);
      };

      mapOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
        console.log(sw.x);

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = '191px';
        div.style.height = '201px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      mapOverlay.prototype.onRemove = function() {
        console.log('removed');
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };


  }

};


$( document ).ready(function() {
  site.init();
});

