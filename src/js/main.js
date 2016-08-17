
var site = {
  init: function() {
    var self = this;
    var navOpen = 'nav-is-open';

    $('#video').YTPlayer({
      fitToBackground: true,
      videoId: 'AHDATlqQcZQ'
  });

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
  }




};


$( document ).ready(function() {
  site.init();
});

