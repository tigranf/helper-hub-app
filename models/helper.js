'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Helper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Helper.hasMany(models.Review, {
        foreignKey: 'helperId'
      });
    }
  }
  Helper.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    title: DataTypes.STRING,
    bio: DataTypes.STRING,
    experience: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    reviews: DataTypes.ARRAY(DataTypes.INTEGER),
    stripeUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Helper',
  });
  return Helper;
};