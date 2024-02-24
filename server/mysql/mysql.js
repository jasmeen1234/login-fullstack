
import {Sequelize} from 'sequelize'
import { createUserModel } from '../model/userSchema.js';
import {createTokenModel} from '../model/tokenSchema.js'

const sequelize = new Sequelize('mysqldb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });


  let UserModel=null;
  let TokenModel=null; 
  const connection=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        UserModel=await createUserModel(sequelize);
        TokenModel=await createTokenModel(sequelize);
       await sequelize.sync()
       console.log('Database synced');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
 }

 export {
  UserModel,
  TokenModel,
  connection
 } ;
