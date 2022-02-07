jQuery(function() {
  initCustom();
});


// content tabs init
function initCustom() {
  jQuery('.is--hamburger').click(function(){
    jQuery(this).toggleClass('menu-active');
    jQuery('.is--menu').toggleClass('nav-active');
  });

  jQuery('.menu_link').click(function(){
    jQuery('.is--hamburger').removeClass('menu-active');
    jQuery('.is--menu').removeClass('nav-active');
  });

  jQuery('.view-button').on('click', function (e) {
    e.preventDefault();
    var _self = jQuery(this);
    console.log('active');
    var clickitem = _self.attr('data-link');
    jQuery('.our-clients_pop-up').each(function () {
      var iditem = jQuery(this).attr('data-slide');
      if(iditem == clickitem) {
          jQuery(this).addClass('popup-active');
          jQuery('body').addClass('hide-scroll');
        }
      });
  });

  jQuery('.pop-up_exit').click(function(e){
    e.preventDefault();
    jQuery('body').removeClass('hide-scroll');
    jQuery(this).parents('.our-clients_pop-up').removeClass('popup-active');
  });
}