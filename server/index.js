import express from 'express';
import cors from 'cors'
import router from './routes/routes.js';
import dotenv from 'dotenv'
import { connection } from './mysql/mysql.js';

dotenv.config()

const app=express();
//middleware
app.use(express.json());
app.use(cors())
app.use(router);


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`)
})

connection();