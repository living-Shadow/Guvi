"use strict";

loadStorage();
var id;
function loadStorage() {
  if(localStorage.getItem("token")==null)
  {
    alert("session expired");
    window.location="login.html";
  }
  let data = localStorage.getItem("token");
  let pdata = JSON.parse(data);
  let $proName = $("#profile");
  id = pdata["id"];
  $proName.html(pdata["username"]);
  if(localStorage.getItem(id)!=null)
  {
    let storeData=JSON.parse(localStorage.getItem(id));
    for (const key in storeData) {
      var rdata="#"+`${key}`;
      console.log(rdata)
      var cdata=`${storeData[key]}`
       $(rdata).val(cdata);
    }
  }
}

// mongodb connection
$(document).ready(function () {
  $("#profileform :input").prop("readonly", true);
  $("#idx").val(id);
  $(function () {
    $("#profileform").on("submit", function (e) {
      e.preventDefault();
      let $error = $("#error");
      let $submit = $("#submit");
      
      if ($submit.val() != "edit") {
        $.ajax({
          type: "POST",
          url: "php/profile.php",
          data: $(this).serialize(),
          success: function (response) {
            let data = JSON.parse(response);
            if (data) {
              localStorage.setItem(id, data.token);
              $error.removeClass("d-none").addClass("alert-success").html("Updated Successfully");
            //  alert("changed");
              $submit.html("Edit profile");
              $submit.val("edit");
              $("#profileform :input").prop("readonly", true);
            } else {
              $error.removeClass("d-none").addClass("alert-danger").html("Error occoured");
           //   alert("error occouted");
            }
          },
        });
      }else{
        console.log("In save mode");
         $submit.val("save");
         $submit.html("Save profile");
         $("#profileform :input").prop("readonly", false);
      }
    
    });
  });
});
