var courseAPI = {

  api_url: 'http://localhost:3000',

  ajax: function(config, cb){
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    });
    $.ajax(config).done(function(data, textStatus, jqhxr){
      cb(null, data);
    }).fail(function(jqhxr, status, error){
      cb({jqhxr: jqhxr, statur: status, error: error});
    });
  },
  createCourse: function(details, callback) {
    this.ajax({
      method: 'POST',
      url: this.api_url + '/courses',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(details),
    }, callback);
  }
};

$(document).ready(function(){

  var geocoder = new google.maps.Geocoder();

  $('#create-course-form').on('submit', function(e){
    e.preventDefault();
    $('#status').html('Please Wait...');
    var course = form2object(this);
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Please make sure you are loggged in and that all fields are filled in!');
        return;
      }
      callback(null, data);
      $('#status').html('');
      $('#aboutModal').modal('hide');
      $('#create-course-form')[0].reset();
    }
    geocoder.geocode( { 'address': course.street_address + '' + course.town + '' + course.state}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        course.lng = results[0].geometry.location.lng().toString();
        course.lat = results[0].geometry.location.lat().toString();
        courseAPI.createCourse(course, cb);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });



  });
});

