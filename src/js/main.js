
var site = {
  init: function() {
    var self = this;
    var navOpen = 'is-open';

    this.ui.navToggle.addEventListener('click', function(e) {
      self.handleNav(navOpen);
    }, false);

  },
  ui: {
    navToggle: document.getElementById('toggle-nav'),
    nav: document.getElementById('main-navigation')
  },
  handleNav: function(open) {  
    $(this.ui.nav).toggleClass(open);
  }




};


$( document ).ready(function() {
  site.init();
});

