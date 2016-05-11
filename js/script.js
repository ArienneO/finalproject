

(function() {
  var triggerEl = document.querySelector('.trigger');
  //variables that encode and display the two locations
  var geocoder, location1, location2;
  // map variables
  var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
  var distanceInput;
  var map;
  // toggle view variables
  var triggers = document.querySelectorAll('a');
  var panelEls = document.querySelectorAll('.panel');

  var homePage = document.getElementById('homePage');

  //adding event listener for nav bar
  function bindEvents() {
    for (var i=0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', function(e) {
        var clickedEl = e.target; // clicked Element
        if (clickedEl.tagName === 'I') {
            clickedEl = clickedEl.parentNode;
          }
        e.preventDefault();
        setActivePanel(clickedEl);
      });
    } 
  };


  function setActivePanel(clickedEl) {
    var panelTarget = clickedEl.getAttribute('href');
    var panelEl = document.querySelector(panelTarget);
    console.log(clickedEl);
    for (var j=0; j < panelEls.length; j++) {
      panelEls[j].classList.remove('is-visible');
    }
    panelEl.classList.add('is-visible');
    homePage.style.display = 'none';
  };

    function submit() {
      var item = {};
      // Getting the values of the form fields.
      item.tripDate = document.getElementById('tripDate').value;
      item.tripDescription = document.getElementById('tripDescription').value;
      item.clientID = document.getElementById('clientID').value;
      item.startLocation = document.getElementById('startLocation').value;
      item.endLocation = document.getElementById('endLocation').value;
      item.distance = document.getElementById('distance').value;

      localStorage.setItem(itemIndex, JSON.stringify(item));
      for(var i=0; i<localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(key));
      }
    };
 

  function initialize() {
  // Initial map function
    directionsDisplay = new google.maps.DirectionsRenderer();

  // default location is KVC 

    var KVC = new google.maps.LatLng(38.851372, -94.831754);

    var myOptions = {
        zoom:7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: KVC

      }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

    showLocation();
  }

   
// geo-encode addresses and display lat and long on map
  function showLocation() {
    var start = document.getElementById("startLocation").value;
    var end = document.getElementById("endLocation").value
    var distanceInput = document.getElementById("distance");
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          distanceInput.value = response.routes[0].legs[0].distance.text;
      }
    });     
  }
  
  document.getElementById('calcDist').onclick = initialize;
  document.getElementById('submitMileage').onclick = submit;
  bindEvents();
  
})();
