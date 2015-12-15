'use strict'

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

  register: function(credentials, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url +'/signup',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  login: function(credentials, callback){
    this.ajax({
      method: 'POST',
      url: this.api_url +'/login',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  logout: function(callback){
    this.ajax({
      method: 'POST',
      url: this.api_url+'/logout',
      contentType:'application/json; charset=utf-8',
      data: JSON.stringify({}),
    }, callback);
  }
};

var form2object = function(form) {
  var data = {};
  $(form).find("input").each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};

var callback = function(error, data) {
  if (error) {
    console.log(JSON.stringify(error));
  }
  console.log(JSON.stringify(data));
};

$(document).ready(function(){

$('#form').on('submit', function(e) {
    $('#status').html('Please Wait...');
    e.preventDefault();
    var credentials = form2object(this);
    console.log(credentials);
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Try Again!');
        return;
      }
      callback(null, data);
      $('#status').html('Success!');
    };
    authAPI.login(credentials, cb);
  });
});

