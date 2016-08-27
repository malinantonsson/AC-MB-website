
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
      this.map.initMap(map);
    }

    var projectsFilter = document.getElementsByClassName('js-filter-list_filter-button');

    if(projectsFilter.length > 0) {
      this.initProjectsFilter(projectsFilter, map);
    }

    var viewToggle = document.getElementsByClassName('projects-list_view-toggle');
     if(viewToggle && map) {
      this.initViewToggle(viewToggle, map);
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

  map: {
    map: {},

    filterSettings: {

      uk: {
        center: {
          lat: 54.72354,
          lng: -3.61175
        },
        zoom: 5
      },
      us: {
        center: {
          lat: 39.84229,
          lng: -97.55859
        },
        zoom: 4
      },
      eu: {
        center: {
          lat: 51.12949,
          lng: 14.55199
        },
        zoom: 4
      },
      all: {
        center: {
          lat: 43.26121,
          lng: -43.76953
        },
        zoom: 3
      }
    },

    initMap: function(mapWrapper) {
      var lat = parseFloat(mapWrapper.getAttribute('data-lat'));
      var lng = parseFloat(mapWrapper.getAttribute('data-lng'));

      var activeMarkerImg = '/images/map/map.png';
      var inactiveMarkerImg = '/images/map/marker--inactive.png';

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
          ],
          scrollwheel: false
      });

      this.map = map;

      var projects = [
        {
         name: 'The Burlington Arcade',
         location: 'London, United Kingdom',
         lat: 51.50831,
         lng: -0.13959,
         bounds: {
            start: {
              lat: 51.50831,
              lng: -0.13959
            }, 
            end: {
              lat: 51.50831,
              lng: -0.13959
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

      var projectsOnMap = [];

      mapOverlay.prototype = new google.maps.OverlayView();

      for(var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var marker, currentProject;

        if(lat == project.lat) {
          isCurrentProject = true;
          marker = activeMarkerImg;

        } else {
          isCurrentProject = false;
          marker = inactiveMarkerImg;
        }

        
        // var overlay;
        var initProjectOverlay = function(currentProject, isCurrentProject) {

          currentProject.marker = new google.maps.Marker({
            position: new google.maps.LatLng(currentProject.lat, currentProject.lng),
            icon: marker,
            map: map
          });

          var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(currentProject.bounds.start.lat, currentProject.bounds.start.lng),
            new google.maps.LatLng(currentProject.bounds.end.lat, currentProject.bounds.end.lng));

          currentProject.overlay = new mapOverlay(bounds, currentProject, map);

          projectsOnMap.push(currentProject);

          currentProject.marker.addListener('click', function(){
            currentProject.overlay.toggle();
            currentProject.marker.setIcon(activeMarkerImg); 

            projectsOnMap.map(function(item){
              if(currentProject != item) {
                item.overlay.hide();
                item.marker.setIcon(inactiveMarkerImg); 
              }
              
            });
          });

          
            setTimeout(function() {
              if(isCurrentProject) {
               currentProject.overlay.show();
              } else {
                currentProject.overlay.hide();
              }
            }, 500);       
            
          

         };
          
          initProjectOverlay(project, isCurrentProject);


      }

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
          panes.overlayImage.appendChild(div);

          //site.ui.body.appendChild(div);
        };

        // Set the visibility to 'hidden' or 'visible'.
        mapOverlay.prototype.hide = function() {
          if (this.div_) {
            // The visibility property must be a string enclosed in quotes.
            this.div_.style.visibility = 'hidden';
          }
        };

        mapOverlay.prototype.show = function() {
          if (this.div_) {
            this.div_.style.visibility = 'visible';
          }
        };

        mapOverlay.prototype.toggle = function() {
          if (this.div_) {
            if (this.div_.style.visibility === 'hidden') {
              this.show();
            } else {
              this.hide();
            }
          }
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

          // Resize the image's div to fit the indicated dimensions.
          var div = this.div_;
          div.style.left = sw.x - 230 + 'px';
          div.style.top = ne.y - 40 + 'px';
          div.style.width = '191px';
          div.style.height = '221px';
        };

        // The onRemove() method will be called automatically from the API if
        // we ever set the overlay's map property to 'null'.
        mapOverlay.prototype.onRemove = function() {
          console.log('removed');
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
        };


    },
    moveMap: function(id) {
      this.map.setCenter(this.filterSettings[id].center);
      this.map.setZoom(this.filterSettings[id].zoom);
    }

  },

  

  initProjectsFilter: function(button, map) {
    var filterIsOpenClass = 'filter--is-open';
    var activeFilterClass = 'filter--is-active';

    var $projectFilterBtn = button[0];
    var $filterWrapper = document.getElementsByClassName('js-filter-list_filter');    
    var $filterItems = document.getElementsByClassName('js-filter-list_filter-item');
    var $activeFilter = document.getElementsByClassName(activeFilterClass)[0];

    var $projectsWrapper = document.getElementsByClassName('js-filtered-content_wrapper')[0];

    var filterHiddenClass = 'filter--hidden';
    var $itemsToFilter = '.js-filter-item';


    
    if(map) {
      //map defaults to all countries
      site.map.moveMap('all');
    }

    var showFilters = function() {
      $($filterWrapper).toggleClass(filterIsOpenClass);
    };

    var setFilter = function(item) {
      item.classList.add(activeFilterClass);

      //reset filter before adding new
      $( $itemsToFilter).removeClass(filterHiddenClass);
      if(item.id !== 'filter--all') {
        $( $itemsToFilter ).filter( ":not(.js-" + item.id + ")" ).addClass( filterHiddenClass );
      }
      //update current filter
      $activeFilter = item;
    };

    for(var i = 0; i < $filterItems.length; i++) {
      $filterItems[i].addEventListener('click', function(e) {
          
          var self = this;
          if(map) {
            var filterId = self.id.replace('filter--', '');
            site.map.moveMap(filterId);
          }

          e.preventDefault();

          //remove filters
          $activeFilter.classList.remove(activeFilterClass);

          //add new filter
          setFilter(self);
          //hide filter box
          showFilters();
        }, false);
    }

    $projectFilterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showFilters();
    }, false);
  },

  initViewToggle: function($wrapper, map) {
    var viewThumbsClass = 'view--thumbs';

    var $viewLinks = document.getElementsByClassName('projects-list_view-link');
    var $projectsWrapper = document.getElementsByClassName('projects-list_wrapper')[0];

    var $projectsListContainer = document.getElementsByClassName('projects-list')[0];
    var showMapClass = 'show--map';

    for(var i = 0; i < $viewLinks.length; i++) {
      $viewLinks[i].addEventListener('click', function(e) {
          var self = this;
          e.preventDefault();

          $($wrapper).toggleClass(viewThumbsClass);

          if(self.id == 'view--map') {
            $projectsListContainer.classList.add(showMapClass);
          } else {   
            $projectsListContainer.classList.remove(showMapClass);
          }
        }, false);
    }
  }

};


$( document ).ready(function() {
  site.init();
});

