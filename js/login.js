$(document).ready(function () {
  $("#submit").click(function () {

    $.ajax({
      type: "POST",
      url: "submission.php",
      data:
        $(this).serialize()
      ,
      cache: false,
      success: function (data) {
        alert(data);
      },
      error: function (xhr, status, error) {
        console.error(xhr);
      },
    });
  });
});
