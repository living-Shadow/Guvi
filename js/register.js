$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    let $error=$("#error");
    if (username == "" || password == "" || email == "" || cpassword == "") {
       
      $error.removeClass('d-none').html('*fill all columns')
      return false;
    }
    if(password!=cpassword)
    {
        $error.removeClass('d-none').html("Password does't match Confirm password")
        return false;
    }

    $.ajax({
      type: "POST",
      url: "php/login.php",
      data: $(this).serialize(),
      cache: false,
      success: function (data) {
        alert(data);
      },
      error: function (xhr, status, error) {
        console.error(xhr);
      }
    });
  });
});
