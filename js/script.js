(function() {
  var triggerEl = document.querySelector('.trigger');
  var distanceData = {};
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
  var databox;
  var db;
  var homePage = document.getElementById('homePage');

  //adding event listener for nav bar
  function bindEvents() {
  //  form.addEventListener("submit", function(e) {
  //    console.log("Saving Value", form.elements.value.value);
  //    e.preventDefault();
  //  });
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




  

  

  // Mileage Report functions 
  document.querySelector("input").focus();
  console.log(document.activeElement.tagName);

  document.querySelector("input").blur();
  console.log(document.activeElement.tagName);

  var form = document.querySelector("form");
  


  document.getElementById('calcDist').onclick = initialize;
  bindEvents();
  
})();
