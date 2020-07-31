var db = require("../models");
//var passport = require("../config/passport");

module.exports = function(app) {
  // get all posted rocks. We want user to be able to see ALL posts( their own and others)
  app.get("/api/rock/posts", function(req, res) {
    db.Rock.findAll({
      where: {
        posted: true
      }
    })
      .then(function(dbRock) {
        res.json(dbRock);
      })
      .catch(function() {
        res.status(500).end();
      });
  });

  // allow a logged in user to post new rock
  app.post("/api/rock/sellerData", function(req, res) {
    db.Rock.create(req.body , { include: db.User })
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(err => console.log(err));
  });

};