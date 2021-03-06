

var initMap = function() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.7604, lng: -95.3698},
    zoom: 10
  });
  

  //Set up Elevation
var elevator = new google.maps.ElevationService;
var infowindow = new google.maps.InfoWindow({map: map});
map.addListener('click', function(event) {
    displayLocationElevation(event.latLng, elevator, infowindow);
  });
// Elevation display
function displayLocationElevation(location, elevator, infowindow) {
  // Initiate the location request
  elevator.getElevationForLocations({
    'locations': [location]
  }, function(results, status) {
    infowindow.setPosition(location);
    if (status === 'OK') {
      // Retrieve the first result
      if (results[0]) {
        // Open the infowindow indicating the elevation at the clicked position.
        infowindow.setContent('The elevation at this point <br>is ' +
            results[0].elevation + ' meters.');
      } else {
        infowindow.setContent('No results found');
      }
    } else {
      infowindow.setContent('Elevation service failed due to: ' + status);
    }
  });
}
  // if brower support available, ask user for location data and set the map view
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var initialLocation = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      map.setCenter(initialLocation);
    });
  }

  // for each marker passed through, add it to the map with a popup
  markers.forEach(function(marker) {
    console.log(marker);
    var position = new google.maps.LatLng(marker.lat, marker.lng);
    var googleMarker = new google.maps.Marker({
      position: position,
      title: marker.name,
      map: map
    });
    // Bind a popup to the marker
    googleMarker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + marker.name + '</h3>'
      });
      infoWindow.open(map, googleMarker);
    });



    tileNEX = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX);

    tileNEX5 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m05m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD5',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX5);

    tileNEX10 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m10m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD10',
        isPng: true,
        optimized: false
    });
    map.overlayMapTypes.push(tileNEX10);

    tileNEX15 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m15m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD15',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX15);

    tileNEX20 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m20m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD20',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX20);

    tileNEX25 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m25m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD25',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX25);

    tileNEX30 = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m30m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD30',
        isPng: true,
    });
    map.overlayMapTypes.push(tileNEX30);

    animateRadar();


  //}

  google.maps.event.addDomListener(window, 'load', initMap);

  function animateRadar() {
    var index = map.overlayMapTypes.getLength() - 1;

    window.setInterval(function(){

        map.overlayMapTypes.getAt(index).setOpacity(0.00);

        index--;
        if(index < 0){
            index = map.overlayMapTypes.getLength() - 1;
        }
        map.overlayMapTypes.getAt(index).setOpacity(0.60);
    }, 400);
  }

  });
};

        


