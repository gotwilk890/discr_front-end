var authAPI = {

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
      data: JSON.stringify({details}),
    }, callback);
  }
};

$(document).ready(function(){

  $('#create-course').click(function(e){
    e.preventDefault();
    $('#aboutModal').modal('show');




  });




});

