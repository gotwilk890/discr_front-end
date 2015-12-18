var courseTemplate = Handlebars.compile($('#course').html());
var usersCourseTemplate = Handlebars.compile($('#users-course').html());
var editUsersCourseTemplate = Handlebars.compile($('#edit-users-course').html());


$(document).on('click','.mark', function(event){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/courses/" + event.target.innerHTML
  }).done(function(data){
    console.log(data[0].user);
    console.log(user);
    var courseHTML = courseTemplate(data[0]);
    var userCourseHTML = usersCourseTemplate(data[0]);
    var editUserCourseHTML = editUsersCourseTemplate(data[0]);

    if(data[0].user === user){
    $('#course-desc').html('');
    $('#course-desc').append(userCourseHTML);
    $('#modal-body').html('');
    $('#modal-body').append(editUserCourseHTML);
    } else{
    $('#course-desc').html('');
    $('#course-desc').append(courseHTML);
  }
  }).fail(function(data){
    console.error(data);
  });
});




