// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // NEW POSTS
  // get all posted rocks. We want user to be able to see ALL posts( their own and others)
  app.get("/api/rock/sellerDataAll", function(req, res) {
    db.TradeReq.findAll({
      where: {
        posted: true
      }
    })
      .then(function(dbTradeReq) {
        res.json(dbTradeReq);
      })
      .catch(function() {
        res.status(500).end();
      });
  });

  // get all users rocks (inventory)
  app.get("/api/user/rocks", function(req, res) {
    db.Rock.findAll({ include: [db.User] })
      .then(function(dbrocks) {
        res.json(dbrocks);
      })
      .catch(function() {
        res.status(500).end();
      });
  });
  // Get specific user rock in inventroy
  app.get("/api/user/rocks/:id", function(req, res) {
    db.Rock.findOne({
      where: {
        id: req.params.id,
        $or: [{ published: true }]
      }
    })
      .then(function(dbrocks) {
        res.json(dbrocks);
      })
      .catch(function() {
        res.status(500).end();
      });
  });
  // allow a logged in user to post new rock
  app.post("/api/rock/sellerData", function(req, res) {
    db.TradeReq.create(req.body, { include: User })
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(err => console.log(err));
  });
  // allow user to update their post
  // app.put("/api/")
  //allow user to delete themselves
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
