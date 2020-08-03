$(document).ready(function () {

  $("#sellerSubBtn").click(function () {
    const name = $("#name").val()? $("#name").val().trim(): "";
    const image = $("#image").val()? $("#image").val().trim(): "";
    const description = $("#desc").val()? $("#desc").val().trim(): "";

    // if (!name || !image) {
    //  return;
    //} 

    const data = {
      name,
      image,
      description
    };


    $.post(
      "/api/rock/sellerData",
      data
    )
      .then(function () {
        window.location.href = "/members.html";
      }).catch(sellerdataErr => {
        console.log("Error submitting form", sellerdataErr);
      });
  });
  
});