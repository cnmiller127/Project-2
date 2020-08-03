var invGlobal, sellData;
var giveRockSelected = false;
var getRockSelected = false;
var btnAppended = false;
$(document).ready(function() {
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
        var chosenRock = {name: invGlobal[i].name, image: invGlobal[i].image, description: invGlobal[i].description};
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
        var chosenRock = {name: sellData[i].name, image: sellData[i].image, description: sellData[i].description};
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

