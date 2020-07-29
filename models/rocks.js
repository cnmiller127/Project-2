// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("rocks", {
    // The email cannot be null, and must be a proper email before creation
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validate: [1]
      }
    },
    // The password cannot be null
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    texture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
     
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  rock.associate = function(models){
      rock.belongsTo(models.User, {
          foreignKey:{
              allowNull: false
          }
      });
  }
  return rocks;
};
