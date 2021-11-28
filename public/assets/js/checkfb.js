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
  var list =  $(".textareaInput").val().trim().split('\n');
  let registered = 0;
   let noRegistered = 0;
  if(list.length > 0){
      list.forEach(function(email){
            $.ajax({
              type: "Post",
              url: "http://localhost:3000/api/v1/check-facebook",
              data: { email },
              success: function (response) {
               if(response.status){
                 registered++;
                 $("#registered").html(registered + " mails");
                 $("#result").append(response.email + '\n');
               } else {
                 noRegistered++;
                 $("#noRegistered").html(noRegistered + " mails");
               }
              }
              });
      });
  };
});

 
});