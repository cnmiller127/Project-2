var db = require("../models");
var rock = {name: "geodude", image: "img.jpg", posted: true};
db.Rock.create(rock); 