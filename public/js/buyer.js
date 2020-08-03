var invGlobal, sellData, selectedGive, selectedGet;
var giveRockSelected = false;
var getRockSelected = false;
var btnAppended = false;
$(document).ready(function() {
  $(".giveSel").append($("<option>").attr("selected", "disabled").text("Please select rock"));
  $(".getSel").append($("<option>").attr("selected", "disabled").text("Please select rock"));
  fillUserRocks();
  fillSellerRocks();

});


function fillUserRocks(){
  $.get("/api/user/inventory").then(function(inv){
    console.log(inv);
    invGlobal = inv;
    for(var i=0; i < inv.length; i++){
      $(".giveSel").append($("<option>").text(inv[i].name).val(i).addClass(" giveOpt browser-default"));
    }

  });
}

function fillSellerRocks(){
  $.get("/api/rock/sellerData").then(function(posts){
    console.log(posts);
    sellData = posts;
    for(var i=0; i < posts.length; i++){
      $(".getSel").append($("<option>").text(posts[i].name).val(i).addClass(" getOpt browser-default"));
    }
  
  });
}


$(".giveRock").change(function(event){
  event.preventDefault();
  if(event.target.matches(".giveSel")){
    $(".giveCard").remove();
    giveRockSelected = true;
    var targ = ($(".giveSel option:selected").text()).trim();
    
    for(var i =0; i < invGlobal.length; i++){
      if(targ === invGlobal[i].name){
        var chosenRock = invGlobal[i];
      }
    }
    
    $(".giveRock").append(

      `<div class="card giveCard">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src=${chosenRock.image}>
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${chosenRock.name}<i class="material-icons right">more_vert</i></span>
            
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${chosenRock.name}<i class="material-icons right">close</i></span>
                <p>${chosenRock.description}</p>
            </div>
        </div>`
    );
    selectedGive = chosenRock;
    tradeButton();
  }
});

// GET ROCK

$(".getRock").change(function(event){
  event.preventDefault();
  if(event.target.matches(".getSel")){
    $(".getCard").remove();
    getRockSelected = true;
    var targ = ($(".getSel option:selected").text()).trim();    
    for(var i =0; i < sellData.length; i++){
      if(targ === sellData[i].name){
        var chosenRock = sellData[i];
      }
    }
      
    $(".getRock").append(
  
      `<div class="card getCard">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src=${chosenRock.image}>
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${chosenRock.name}<i class="material-icons right">more_vert</i></span>
              
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${chosenRock.name}<i class="material-icons right">close</i></span>
                  <p>${chosenRock.description}</p>
              </div>
          </div>`
    );
    selectedGet=chosenRock;
    tradeButton();
  }
});

function tradeButton(){
  if(giveRockSelected && getRockSelected && btnAppended===false){
    $(".container-main").append($("<button>").addClass("tradeBtn").text("TRADE ROCKS"));
    btnAppended=true;
    
  }
  else{
    if($("tradeBtn")){
      $("tradeBtn").remove();
    }
  }
}

$(".container-main").on("click", function(event){
  event.stopPropagation();
  if(event.target.matches(".tradeBtn")){
    console.log(selectedGet);
    //GIVE from current user TO posting first
    $.ajax({
      method: "PUT",
      url: "/api/user/inventory/" + selectedGive.id,
      data: {id: selectedGet.id, name: selectedGet.name, image: selectedGet.image, description: selectedGet.description, posted: false, UserId: selectedGive.UserId} 
    }).then( $.ajax({
      method: "PUT",
      url: "/api/user/inventory/" + selectedGet.id,
      data: {id: selectedGive.id, name: selectedGive.name, image: selectedGive.image, description: selectedGive.description, posted: false, UserId: selectedGet.UserId}
    })).then(function(){
      btnAppended = false;
      giveRockSelected = false;
      getRockSelected = false;
      $(".giveCard").remove();
      $(".getCard").remove();
      $(".tradeBtn").remove();
      $(".giveOpt").remove();
      $(".getOpt").remove();
      alert("TRADE MADE");
      fillUserRocks();
      fillSellerRocks();
    });
  }
});