module.exports = function(sequelize, DataTypes) {
  //This will change depending on what we obtain from user on front end trade request form.
  var tradeRes = sequelize.define("tradeRes", {
    rockName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rockDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    rockImgURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    }
  });
  tradeRes.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    tradeRes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return tradeRes;
};
