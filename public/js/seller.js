$(document).ready(function(){
    //Getting references from seller.html page
var sellerForm = $("form.sellerForm");
var rockName = $("input#Rock_name");
var rockImage = $("input#url");
var Desc = $("textarea.materialize-textarea");
// When the signup button is clicked, we validate the email and password are not blank
sellerForm.on("submit", function(event) {
    event.preventDefault();
    var sellerData = {
      rockName: rockName.val().trim(),
      rockImage: rockImage.val().trim(),
      Desc: Desc.val().trim()
    };

  // Does a post to the sellerdata route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function sellarData(rockName,rockImage,Desc) {
    $.post("/api/sellarData", {
      rockName: rockName,
      rockImage: rockImage,
      Desc: Desc
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

})