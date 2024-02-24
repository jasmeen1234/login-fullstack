import {  DataTypes } from "sequelize";
export const createUserModel=(sequelize)=>{
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isLowercase: true,
      unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return User;
}