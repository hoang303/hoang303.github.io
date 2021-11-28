$(document).ready(function () {

 var clipboard = new ClipboardJS('#copy_q');

 clipboard.on('success', function (e) {
  swal("Thông báo", "Đã sao chép vào clipboard !", "success");
  e.clearSelection();
 });

 clipboard.on('error', function (e) {
  swal("Thông báo", "Sao chép vào clipboard thất bại !", "error");
 });

 $("#btnCheck").click(function (e) {
  e.preventDefault();
  var list = $("#mail_input").val().trim().split('\n');

  var live = 0;
  var die = 0;
 
  if (list.length > 0) {
   list.forEach(function (email) {
    setTimeout(function(){
     $.ajax({
      type: "Post",
      url: "https://tools-trickfb.herokuapp.com/api/v1/check-mail",
      data: { email },
      success: function (response) {
       console.log(response);
       if (response.status === "noExits") {
        live++;
        $("#live").html(live + " mails");
        $("#result").append(response.email + '\n');
       } else {
        die++;
        $("#die").html(die + " mails");
       }
      }
     });
    }, 2000);
    
   });
  };
 });


});