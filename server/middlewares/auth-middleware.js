import apiErrors from '../exceptions/apiErrors.js'
import tokenService from '../services/tokenService.js'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware =(req,res,next)=>{
    let originalReq
    try{
        // console.log('NEW REQUEST \n\n',req)
        const {originalUrl,method,body} = req
        originalReq = {originalUrl,method,body}
        // console.log('originalReq:',originalReq)
        const token = req.headers.authorisation.split(' ')[1]//taking access_token from header
        const decoded = tokenService.checkAccessToken(token);
        req.user = decoded
    
        next()
    }
    catch(e){
        throw apiErrors.unAuthorized(originalReq)
    }
    
}