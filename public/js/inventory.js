$(document).ready(function () {

  $("#inventorySubBtn").click(function () {
    const name = $("#nameInv").val()? $("#nameInv").val().trim(): "";
    const image = $("#imageInv").val()? $("#imageInv").val().trim(): "";
    const description = $("#descInv").val()? $("#descInv").val().trim(): "";
  
    // if (!name || !image) {
    //  return;
    //} 
  
    const dataInv = {
      name,
      image,
      description
    };
  
    console.log("inventory data", dataInv);
  
    $.post(
      "/api/user/inventory",
      dataInv
    )
      .then(function () {
        window.location.href = "/members.html";
      }).catch(invDataErr => {
        console.log("Error submitting form", invDataErr);
      });
  });
  
});