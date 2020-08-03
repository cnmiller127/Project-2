// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// eslint-disable-next-line no-unused-vars
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Rock = sequelize.define("Rock", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isURL: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    posted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Rock.associate = function(models) {
    Rock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Rock;
};
