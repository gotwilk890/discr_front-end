$(document).ready(function(){
  $('.reg').click(function(){
    $('#login-form').hide();
    $('#register-form').show();
    $('.login-msg').hide();
    $('.register-msg').show();
    $('#modal-header').html('Register');

  });

  $('.log').click(function(){
    $('#login-form').show();
    $('#register-form').hide();
    $('.login-msg').show();
    $('.register-msg').hide();
    $('#modal-header').html('Login');
  });

    $('#create-course').click(function(e){
    e.preventDefault();
    $('#aboutModal').modal('show');
    $('#login-form').hide();
    $('#create-course-form').show();
    $('.login-msg').hide();
    $('#modal-header').html('Create a Course');
  });
});
