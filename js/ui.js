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

    $('#create-course').click(function(){
    $('#aboutModal').modal('show');
    $('#login-form').hide();
    $('#logout').hide();
    $('#register-form').hide();
    $('#create-course-form').show();
    $('.login-msg').hide();
    $('#modal-header').show();
    $('#modal-header').html('Create a Course');
  });
    $('#modal1').click(function(){
      if($('#modal1').html() === 'Login'){
        $('#login-form').show();
        $('.login-msg').show();
        $('#modal-header').show();
        $('#create-course-form').hide();
        $('#modal-body').hide();
      }
      else {
        $('#status').html('');
        $('#modal-body').hide();
        $('#create-course-form').hide();
        $('#logout').show();
        $('#modal-header').html('');
        $('.login-msg').hide();
        $('.register-msg').hide();
      }
    });

  $(document).on('click','.edit', function(){
    $('#aboutModal').modal('show');
    $('#login-form').hide();
    $('#logout').hide();
    $('#register-form').hide();
    $('#create-course-form').hide();
    $('.login-msg').hide();
    $('#modal-header').show();
    $('#modal-header').html('Edit your course');
    $('#modal-body').show();

  });

});
