module.exports = function(sequelize, DataTypes) {
  const Rocks = sequelize.define("rocks", {
    // Define rock model/create rocks db table
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
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false
    },
    texture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posted: {
      type: DataTypes.STRING,
      defaultValue: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Rocks.associate = function(models) {
    Rocks.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Rocks;
};
