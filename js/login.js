function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

$(document).ready(function () {
  $(function () {
    $("#loginform").on("submit", function (e) {
      e.preventDefault();
      let $error = $("#error");
      if(!(checkPassword($("#password").val())))
      {
        $error.removeClass("d-none").addClass("alert-danger").html("Invalid email or password");
      }
      else
      {
      $.ajax({
        type: "POST",
        url: "php/login.php",
        data: $(this).serialize(),
        success: function (response) {
          let data=JSON.parse(response);
          localStorage.setItem('token',data.token);
          if (data == "enf") {
         //   alert("Email and/or password is incorrect");
            $error.removeClass("d-none").addClass("alert-danger").html("Email and/or password is incorrect");
          }
          else if(data=="please fill the form")
          {
            $error.removeClass("d-none").addClass("alert-danger").html(data);
          }
          else if(data == "enf")
          {
            $error.removeClass("d-none").addClass("alert-danger").html("Email and/or password is incorrect");
          }
          else if(data == "unr")
          {
            $error.removeClass("d-none").addClass("alert-danger").html("User not found");
          //  alert();
          }
          else
          {
           // alert("login successfull");
            window.location="profile.html";
          }
        }
      });
    }
    });
  });
});
