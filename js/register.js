function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

$(document).ready(function () {
  $(function () {
    $("#registerform").on("submit", function (e) {
      e.preventDefault();
      let $error = $("#error");
      if(!(checkPassword($("#password").val())))
      {
        $error.removeClass("d-none").addClass("alert-danger").html("Invalid email or password, the password should have min 8 letter password, with at least a symbol, upper and lower case letters and a number");
        
      }
      else
      {
      $.ajax({
        type: "POST",
        url: "php/register.php",
        data: $(this).serialize(),
        success: function (response) 
        {
          let data=JSON.parse(response);
          if (data == "register Success")
          {
            //alert(data);
            $(':input','#registerform')
                      .not(':button, :submit, :reset, :hidden')
                      .val('')
                      .removeAttr('checked')
                      .removeAttr('selected');
                      if($error.hasClass("alert-danger"))
                      {
                          $error.removeClass("alert-danger");
                      }
            $error.removeClass("d-none").addClass("alert-success").html(data);
          }
          else
          {
            $error.removeClass("d-none").addClass("alert-danger").html(data);
          //   alert(data);
          }
        }
      });
    }
    });
  });
});
