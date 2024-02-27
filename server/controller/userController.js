import { TokenModel, UserModel } from "../mysql/mysql.js";
import {sendEmail} from '../utils/email.js'
import crypto from 'crypto';
import jwt from "jsonwebtoken"
export const signUpController =async (req, res) => {
    try {
        let {name,email,password,cpassword,userType} = req.body;
        console.log( req.body)
          if(!name){
            return res.status(200).json({ error: "name is required" });
          }
          if(!email){
            return res.status(200).json({ error: "email is required" });
          }
          if(!password){
            return res.status(200).json({ error: "password is required" });
          }
          if(!cpassword){
            return res.status(200).json({ error: "conform password is required" });
          }
          if(password!==cpassword){
            return res.status(200).json({ error: "password mismatch" });
        }
        if(!userType){
            return res.status(200).json({ error: "select user type" });
          }

        const emp = await UserModel.findOne({ where: { email: email } });
        if (emp === null) {           
          const user = await UserModel.create(req.body);
        //   let token=await  TokenModel.create({
        //     email: user.email,
        //     token: crypto.randomBytes(32).toString("hex")
        //   })
          //const message = `${process.env.BASE_URL}/user/verify/${user.email}/${token.token}`;
         const otp= await sendEmail(user.email, 'Email Verification');
         let token=await  TokenModel.create({
            email: user.email,
            userType:user.userType,
            token:otp
          })
          return res.status(201).json({message:`otp has been sent to your email: ${user.email}`});
        } else {
          return res.status(200).json({ message: "already found" });
        }
    
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  export const emailVarificationController=(req,res)=>{
    const {token} = req.params; 
  
    // Verifying the JWT token  
     try{
        jwt.verify(token, 'ourSecretKey', function(err, decoded) { 
            if (err) { 
                console.log(err); 
               return res.send("Email verification failed,  possibly the link is invalid or expired"); 
            } 
            else { 
               return res.send("Email verifified successfully"); 
            } 
        });
     }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'Internal Server Error' });
     } 
  }

  export const emailOTPVarificationController=async(req,res)=>{
    const {email,userType,otp} = req.body; 
  
    // Verifying the JWT token  
     try{
         let dbotp= await TokenModel.findOne({where:{email:email,userType:userType,token:otp}});
         if(!dbotp){
            return res.status(200).json({error:"otp not found"});
         }
         await TokenModel.destroy({where:{token:otp}});
         return res.status(200).json({message:"otp has been verified"});
     }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'Internal Server Error' });
     } 
  }

  export const loginController=async(req,res)=>{
      const {email,password,userType}=req.body;

      console.log("login here",req.body)
     try{
        if(!email){
            return res.status(200).json({ error: "email is required" });
          }
          if(!password){
            return res.status(200).json({ error: "password is required" });
          }
          if(!userType){
            return res.status(200).json({ error: "select user type" });
          }
          // const user = await UserModel.findOne({ where: { email: email,password:password,userType:userType } });
          // console.log("this is user",user)
          // if(!user){
          //   return res.status(200).json({ error: "user not found" });
          // }
          return res.status(200).json({ message: "successfully logged in" });
     }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'Internal Server Error' });
     }
  }
  export const resetController=async(req,res)=>{
    const {email,userType}=req.body;
   try{
          if(!userType){
        return res.status(200).json({ error: "select user type" });
      }
    if(!email){
        return res.status(200).json({ error: "email is required" });
      }

      const user = await UserModel.findOne({ where: { email: email,userType:userType } });
      if(!user){
        return res.status(200).json({ error: "user not found" });
      }
      const otp= await sendEmail(user.email, 'Email Verification');
         let token=await  TokenModel.create({
            email: user.email,
            userType:user.userType,
            token:otp
          })
      return res.status(200).json({ message: "otp has been sent" });
   }catch(e){
    console.log(e)
    return res.status(500).json({ error: 'Internal Server Error' });
   }


  }
  export const setController=async(req,res)=>{
    const {email,password,cpassword,userType,otp}=req.body;
    try{
        if(!email){
            return res.status(200).json({ error: "email is required" });
          }
          if(!password){
            return res.status(200).json({ error: "password is required" });
          }
          if(!cpassword){
            return res.status(200).json({ error: "conform password is required" });
          }
          if(password!==cpassword){
            return res.status(200).json({ error: "password mismatch" });
        }
        if(!userType){
            return res.status(200).json({ error: "select user type" });
          }
        //   let dbotp= await TokenModel.findOne({where:{token:otp,email:email}});
        //  if(!dbotp){
        //     return res.status(200).json({error:"otp not found"});
        //  }
        //  await UserModel.update({password:password,cpassword:cpassword},
        //     {where: { email: email,userType:userType }})
       
         return res.status(200).json({message:"password has been set"})

        
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const getAllUsersController=async(req,res)=>{
    try{
      let users=await UserModel.findAll({where:{userType:"user"}});
      if(users.length===0){
        return res.status(200).json({error:"user not found"});
      }
      return res.status(200).json(users);
    }catch(e){
      console.log(e);
      return res.status(500).json({error:"Internal  error"});
    }
  }

  export const deleteUserController=async(req,res)=>{
    let id=req.params.id;
    console.log(id)
    try{
      let user=await UserModel.destroy({where:{id:id,userType:"user"}});
      if(user===null){
        return res.status(200).json({error:"user not found"});
      }
      return res.status(200).json({message:"user deleted successfull"});
    }catch(e){
      console.log(e);
      return res.status(500).json({error:"Internal  error"});
    }
  }