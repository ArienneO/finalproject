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
    } triggerEl.addEventListener('click', onTriggerClick);
  };


  function setActivePanel(clickedEl) {
    var panelTarget = clickedEl.getAttribute('href');
    var panelEl = document.querySelector(panelTarget);
    console.log(clickedEl);
    for (var j=0; j < panelEls.length; j++) {
      panelEls[j].classList.remove('is-visible');
    }
    panelEl.classList.add('is-visible');
  };

  function initialize() {
  // Initial map function
    directionsDisplay = new google.maps.DirectionsRenderer();

  // default location is Olathe, KS

    var KVC = new google.maps.LatLng(38.851372, -94.831754);

    var myOptions = {
        zoom:7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: KVC

      }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);

    showLocation();
    //geocoder = new GClientGeocoder();
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




  //finds the coordinates for the two locations and calls the showMap()function

  function onTriggerClick(e) {
   
    if (triggerEl.innerText === 'Start Trip') {
      distanceData.startTrip = getLatLng();
      triggerEl.innerText = 'End Trip';
    } else {
      distanceData.endTrip = getLatLng();
      triggerEl.innerText = 'End Trip';
    }
    e.preventDefault();
    console.log(distanceData);
  };
/*
  function getLatLng() {
    if(navigator.geolocation) {
      navigator.getCurrentPosition(onSuccess, onError)
    } else {
        alert(Your browser does not support Geolocation API);
      }
  }

  function onSuccess(position) {
    var latLng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.latitude)};  
  }

  

  function onError(error) {
    switch(error.code) {
        case 0:
          document.getElementById("error").innerHTML = "General Error";
          break;
        case 1:
          document.getElementById("error").innerHTML = "Permission Denied";
          break;
        case 2:
          document.getElementById("error").innerHTML = "Unable to determine location";
          break;
        case 3:
          document.getElementById("error").innerHTML = "Timeout";
          break;
      }
  }


  
  /* function onTriggerClick(e) {
    if (triggerEl.innerText === 'Start Trip') {
      distanceData.startTrip = updateLocation(position);
      triggerEl.innerText = 'End Trip';
    } else {
      distanceData.endTrip = updateLocation(position);
      triggerEl.innerText = 'End Trip';
    }
    e.preventDefault();
    console.log(distanceData);
  };
*/

  // draw map
  //var map = new google.maps.Map(document.querySelector('map'));
 // function updateLocation(position) {
 // map.setCenter(new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)));
 // navigator.geolocation.getCurrentPosition(updateLocation,handleLocationError);
  // get user's position
 /* function findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(calcRoute);
  }

  function calcTrip() {
    var LatLng = {Lat: parseFloat(lati)}
    var startTrip = new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude);
  /*    
    function showError(err) {
      if(err.code == 1) {
        alert("Error: Access is denied!");
      }

      else if(err.code == 2) {
        alert("Error: Position is unavailable");
      }
    };

    var endTrip = function getLocationUpdate() {
      if(navigator.geolocation) {
        var options = {timeout:6000}
        geoLoc = navigator.geolocation;
        watchID = geoLoc.watchPosition(startTrip, error, options);
      }
      else {
        alert("Browser does not support geolocation");
      }
    }
    
  };
*/
 /* function getLatLng() {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var startLatLng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
   
    function success(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      console.log(lat,lng);
    };

    function error() {
      alert("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);

  }; */

 // Enter Mileage Page functions
  
  document.getElementById('calcDist').onclick = initialize;
  bindEvents();
  
})();
