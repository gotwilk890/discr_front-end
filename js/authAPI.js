'use strict'
var user;
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

$('#login-form').on('submit', function(e) {
    $('#status').html('Please Wait...');
    e.preventDefault();
    var credentials = form2object(this);
    user = credentials.username;
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Try Again!');
        return;
      }
      callback(null, data);
      $('#status').html('');
      $('#login-form').hide();
      $('#logout').show();
      $('#aboutModal').modal('hide');
      $('#modal1').html('Logout '+ user);
      $('#modal-header').hide();
      $('.login-msg').hide();
      $('#login-form')[0].reset();
    };
    authAPI.login(credentials, cb);
  });

  $('#register-form').on('submit', function(e) {
    $('#status').html('Please Wait...');
    e.preventDefault();
    var credentials = form2object(this);
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Try Again!');
        return;
      }
      callback(null, data);
      $('#status').html('Now login!');
      $('#login-form').show();
      $('#register-form').hide();
      $('.login-msg').show();
      $('.register-msg').hide();
      $('#modal-header').html('Login');
      $('#register-form')[0].reset();

    };
    authAPI.register(credentials, cb);
  });

  $('#logout').click(function(e) {
    e.preventDefault();
    user=null;
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#status').html('Try Loggin in first!');
        return;
      }
      callback(null, data);
      $('#status').html('');
      $('#login-form').show();
      $('.login-msg').show();
      $('#modal-header').show();
      $('#modal1').html('Login');
      $('#aboutModal').modal('hide');
      $('#logout').hide();

    };
    authAPI.logout(cb);
  });
});

