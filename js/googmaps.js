
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
    });
  }
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById('gmap'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    // console.log(places.icon);
    // console.log(places[0].formatted_address);
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    $.ajax({
    method: "GET",
    url: "http://localhost:3000/courses",
    dataType: "json"
    }).done(function(data){
      data.forEach(function(course){
      var lat = Number(course.lat);
      var lng = Number(course.lng);
      myLatLng = new google.maps.LatLng(lat, lng);
      var icon = {
        url: 'http://i711.photobucket.com/albums/ww115/CodyFLee/BasketFavIcon48x48.jpg',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: course.name,
        position: myLatLng,
        animation: google.maps.Animation.DROP
      });
      var infowindow = new google.maps.InfoWindow({
        content: "<a>" + course.name + "</a>"
        });
      marker.addListener("mouseover", function(){
        infowindow.open(map, marker);
      });
      markers.push(marker);
    });

    }).fail(function(data){
    console.error(data);
    });

    geocoder.geocode( { 'address': places[0].formatted_address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.location.lng());
        console.log(results[0].geometry.location.lat());
        console.log(results[0]);
        console.log(map.getBounds().contains(myLatLng));
        console.log(myLatLng);
        // console.log(map.getBounds().contains(latlng: myLatLng));
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
