import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
export const sendEmail = async (email, subject) => {
    const otp=Math.ceil(1000000*Math.random())
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const token = jwt.sign({ 
        data: 'Token Data' 
    }, 'ourSecretKey', { expiresIn: '2m' }   
);

    const mailConfigurations = { 
  
        // It should be a string of sender/server email 
        from: 'rraj58361@gmail.com', 
      
        to:email, 
      
        // Subject of Email 
        subject:subject, 
        text:`OTP is  ${otp}`
        // This would be the text of email body 
        // text: `Hi! There, You have recently visited  
        //        our website and entered your email. 
        //        Please follow the given link to verify your email 
        //        http://${process.env.BASE_URL}/verify/${token}  
        //        Thanks` 
          
    }; 

    transporter.sendMail(mailConfigurations, function(error, info){ 
        if (error) throw Error(error); 
        console.log('Email Sent Successfully'); 
        console.log(info); 
    }); 
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
  return otp;
};

