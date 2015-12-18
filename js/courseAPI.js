var courseAPI = {

  api_url: 'https://shrouded-earth-1727.herokuapp.com',

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
  },
  editCourse: function(details, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.api_url + '/courses',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(details),
    }, callback);
  },
  deleteCourse: function(details, callback) {
    this.ajax({
      method: 'DELETE',
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

  $(document).on('submit', '#edit-course-form', function(e){
    e.preventDefault();
    $('#status').html('Please Wait...');
    var course = form2object(this);
    var id = $('#edit-data').data('id');
    var name = $('#edit-data').data('name');
    course._id = id;
    course.name = name;
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Please make sure you are loggged in and that all fields are filled in!');
        return;
      }
      callback(null, data);
      $('#status').html('');
      $('#aboutModal').modal('hide');
      $('#edit-course-form')[0].reset();
    }
    geocoder.geocode( { 'address': course.street_address + '' + course.town + '' + course.state}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        course.lng = results[0].geometry.location.lng().toString();
        course.lat = results[0].geometry.location.lat().toString();
        console.log(course);
        courseAPI.editCourse(course, cb);
        $('#course-desc').html('');


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });




  });

  $(document).on('click','.remove', function(){
      var course = {};
      var id = $('.remove').data('id');
      course._id = id;
      console.log(course);
      var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#delete-status').html('Something went wrong Log back in');
        return;
      }
      callback(null, data);
      $('#delete-status').html('Deleted');
      $('#course-desc').html('');
    }
    courseAPI.deleteCourse(course, cb);


    });
});

