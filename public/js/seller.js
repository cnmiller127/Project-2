$(document).ready(function () {

  $("#sellerSubBtn").click(function () {
    const name = $("#name").val()? $("#name").val().trim(): "";
    const image = $("#image").val()? $("#image").val().trim(): "";
    //const desc = $("#desc").val()? $("#desc").val().trim(): "";

    // if (!name || !image) {
    //  return;
    //} 

    const data = {
      name,
      image,
      //desc
    };

    console.log("seller data", data);

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