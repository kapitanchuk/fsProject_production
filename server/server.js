import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import express from 'express'
import familyRoutes from './routes/familyRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import errorsMiddleware from './middlewares/errors-middleware.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000
const connection = process.env.CONNECTION;


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))
app.use('/api/user',userRoutes)
app.use('/api/family',familyRoutes)
app.use(errorsMiddleware)//если были ошибки, middleware принимает их после роутов

async function StartApp(){
    try {
       await mongoose.connect(connection)
       app.listen(PORT,()=>console.log('connected on port ',PORT))
       
    } catch (e) {
        console.log(e)
    }
}
StartApp()




