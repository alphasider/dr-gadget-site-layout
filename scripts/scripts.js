$(document).ready(function(){
    
    // Toggle Menu

    var btn = document.getElementById('hamburger-menu'),
        overlay = document.getElementById('overlay'),
        menu = document.getElementById('main-nav'),
        menuItem = document.getElementsByClassName('nav-menu__item'),
        logo = document.getElementById('logo');

    btn.addEventListener('click', toggler);
    overlay.addEventListener('click', overlayToggler);
    logo.addEventListener('click', overlayToggler);

    var i;
    for(i = 0; i < menuItem.length; i++){
        menuItem[i].addEventListener('click', overlayToggler);
    }

    function toggler(){
        menu.classList.toggle('closed');
        overlay.classList.toggle('closed');
    }

    function overlayToggler(){
        menu.classList.add('closed');
        overlay.classList.add('closed');
        document.getElementById('menu-btn').checked = false;
    };


  // Header slider
  
  $('.fullscreen-slider').slick({
  	arrows: false,
  	dots: true,
    autoplay: true
  });
  $('.services-slider').slick({
    arrows: false,
    dots: false,
    autoplay: true
  });


  $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60 // -70 for display section title
        }, 1000);
    });

  // Add | Remove active class from nav menu elements on scroll

  var navChildren = $('.navigation-menu li').children();
  var aArray = [];
  for (var i = 0; i < navChildren.length; i++) {
      var aChild = navChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
  }
  $(window).scroll(function () {
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      for (var i = 0; i < aArray.length; i++) {
          var theID = aArray[i];
          var secPosition = $(theID).offset().top;
          secPosition = secPosition - 135;
          var divHeight = $(theID).height();
          divHeight = divHeight + 90;
          if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
              $(".navigation-menu__item").removeClass('navigation-menu__item_active');
              $('li > a[href=\'' + theID + '\']').parent().addClass('navigation-menu__item_active');
          } else {
              $('a[href=\'' + theID + '\']').parent().removeClass('navigation-menu__item_active');
          }
      }
  });


  ///////////////////////////////////////////////////////////////////////////////////

  // Yandex Maps
  ymaps.ready(init);
	var dGadgetMap,
	 		dGadgetPlacemark;

  function init(){     
    dGadgetMap = new ymaps.Map("map", {
        center: [55.80206382175366,38.98144794549264],
        zoom: 18,
        controls: []
    });
    dGadgetPlacemark = new ymaps.Placemark(
    	[55.80206382175366,38.98144794549264],
    	{
    		hintContent: 'Доктор Гаджет',
    		iconCaption: 'Доктор Гаджет'
    	},
      {
        iconLayout: 'default#image',
        iconImageHref: 'assets/imgs/contacts/icon_map_ballon.svg',
        iconImageSize: [56, 70],
        iconImageOffset: [-10, -25]
      }
    );
    dGadgetMap.behaviors.disable(['scrollZoom']);
    dGadgetMap.geoObjects.add(dGadgetPlacemark);
  }


});

// Add | Remove active class from nav menu elements on scroll
var navChildren = $('.nav-menu li').children();
    var aArray = [];
    for (var i = 0; i < navChildren.length; i++) {
        var aChild = navChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var secPosition = $(theID).offset().top;
            secPosition = secPosition - 135;
            var divHeight = $(theID).height();
            divHeight = divHeight + 90;
            if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                $(".nav-menu__item").removeClass('nav-menu__item_active');
                $('li > a[href=\'' + theID + '\']').parent().addClass('nav-menu__item_active');
            } else {
                $('a[href=\'' + theID + '\']').parent().removeClass('nav-menu__item_active');
            }
        }
    });

// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var service = new google.maps.places.PlacesService(reviews_container);

        service.getDetails({
          placeId: 'ChIJPd77BGMcS0ERw1PjTwNPl_Y'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var i;
            for(i = 0; i < place.reviews.length; i++){
              var name = place.reviews[i].author_name;
              var comment = place.reviews[i].text;
              var avatar = place.reviews[i].profile_photo_url;
              var time = place.reviews[i].relative_time_description;
              var rating = place.reviews[i].rating;
              //console.log(name + '<br>' + avatar + '<br>' + time + '<br>' + rating + '<br>' + comment);

              var reviewsContainer = document.getElementById('reviews_container'); // Get reviews container
              
              var reviewsItem = '<div class="reviews-item">' +
                                  '<div class="reviews-item__header">' +
                                    '<div class="reviews-item__avatar">' +
                                      '<img src="' + avatar + '" alt="">' +
                                    '</div>' +
                                    '<div class="reviews-item__info">' +
                                      '<span class="reviews-item__name">' + name + '</span>' +
                                      '<span class="reviews-item__date">' + time + '</span>' +
                                    '</div>' +
                                  '</div>' +
                                  '<div class="reviews-item__comment">' + comment + '</div>' +
                                '</div>';

              reviewsContainer.insertAdjacentHTML('beforeend', reviewsItem); // Insert unique review item into Reviews container
              
            };
            reviewsSlider();
          }
        });
      }
      
    function reviewsSlider(){
      if (document.documentElement.clientWidth < 1140) {
        $('#reviews_container').slick({
          arrows: false,
          dots: false,
          autoplay: true,
          variableWidth: true,
          centerMode: true,
          slidesToShow: 1
        });
      } else {
        $('#reviews_container').slick('unslick');
      }
    };
    
    

    window.onresize = function(){
      reviewsSlider();
    };