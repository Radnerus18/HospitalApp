import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv()
import connectToDatabase from './dbConn.js';
import registerNewUser from './Controllers/NewUser.Controller.js';
import {SendOtp,VerifyOtp} from './Controllers/OtpVerify.Controller.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './postgreDb.js';
const {PORT} = process.env;
const app = express();
connectToDatabase()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.get('/',async(req,res)=>{
    const result = await pool.query('SELECT current_database()')
    res.send(`the database value is ${result.rows[0].current_database}`)
})
app.post('/new-user',registerNewUser)
app.post('/send-otp',SendOtp),
app.post('/verify-otp',VerifyOtp)
app.listen(PORT,()=>{
    console.log('Server is running at port',PORT)
})
