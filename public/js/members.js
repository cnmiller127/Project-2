$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $("#empty-div").append(
    `<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="https://i.pinimg.com/originals/7b/f2/0f/7bf20f01af1b9fb5c940724892da0e93.jpg">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Rock example<i class="material-icons right">more_vert</i></span>
      <a class="trade-rock waves-effect waves-light btn-small">Trade rock</a>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Rock example<i class="material-icons right">close</i></span>
      <p>Here is some more information about this rock that is only revealed once clicked on.</p>
    </div>
  </div>`);

});
