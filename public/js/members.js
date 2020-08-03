$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // $("#empty-div").append(
  //   `<div class="card">
  //   <div class="card-image waves-effect waves-block waves-light">
  //     <img class="activator" src="https://i.pinimg.com/originals/7b/f2/0f/7bf20f01af1b9fb5c940724892da0e93.jpg">
  //   </div>
  //   <div class="card-content">
  //     <span class="card-title activator grey-text text-darken-4">Rock example<i class="material-icons right">more_vert</i></span>
  //     <a href="seller.html" class="trade-rock waves-effect waves-light btn-small">Trade rock</a>
  //   </div>
  //   <div class="card-reveal">
  //     <span class="card-title grey-text text-darken-4">Rock example<i class="material-icons right">close</i></span>
  //     <p>Here is some more information about this rock that is only revealed once clicked on.</p>
  //   </div>
  // </div>`);
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
renderRocks();

function renderRocks(){
  $.get("/api/user/inventory").then(function(inv){
    for(var i=0; i < inv.length; i++){
      console.log(inv[i].id);
      $("#empty-div").append(
        `<div class="card card-inventory">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src=${inv[i].image}>
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${inv[i].name}<i class="material-icons right">more_vert</i></span>
          
        
      ${inv[i].posted ? "<p>This rock is up for trade!</p>" : `<button class=\"trade-rock waves-effect waves-light btn-small\" value= ${inv[i].id} >Trade rock</button></div>`}
    
        
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${inv[i].name}<i class="material-icons right">close</i></span>
          <p>${inv[i].description}</p>
        </div>
      </div>`);

    }
  });
}

$("#empty-div").on("click", function(event){
  event.stopPropagation();
  if(event.target.matches(".trade-rock")){
    var pickedID = $(event.target).val();
    $.ajax({
      method: "PUT",
      url: "/api/rock/sellerData/" + pickedID
    }).then(function(){
      $("<p>").text("This rock is up for trade!").appendTo($(event.target).parent());
      $(event.target).remove();
    }).catch(err=> console.log(err));
  }
});
