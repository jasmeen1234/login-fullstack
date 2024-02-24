import {  DataTypes } from "sequelize";
export const createTokenModel=(sequelize)=>{
  const Token = sequelize.define('Token', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isLowercase: true,
      unique: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return Token;
}