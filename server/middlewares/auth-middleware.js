import apiErrors from '../exceptions/apiErrors.js'
import tokenService from '../services/tokenService.js'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware =(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]//taking access_token from header
        const decoded = tokenService.checkAccessToken(token);
        req.user = decoded
    
        next()
    }
    catch(e){
        throw apiErrors.unAuthorized()
    }
    
}