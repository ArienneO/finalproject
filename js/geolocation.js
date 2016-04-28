


// get location
initMap();
function initMap() {
  navigator.geolocation.watchPosition(successFn, errorFn)
};

function successFn(position) {
  drawMap(position.lat, position.lng);
};

function drawMap(lat, lng) {
 //draw map with google maps api here
};

function errorFn() {

};

function updateLocation(position) {
  var watchId = navigator.geolocation.watchPosition(updateLocation)
  /*, handleLocationError);*/

  var myLatLng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
  map = new google.maps.Map(document.getElementById('map'), {
  center: myLatLng,
  zoom: 8
  });
        // Create a marker and set its position.
       var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'Start Location',
        });
      }

navigator.geolocation.clearWatch(watchId);
