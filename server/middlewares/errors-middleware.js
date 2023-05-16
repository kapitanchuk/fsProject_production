import apiErrors from '../exceptions/apiErrors.js'


export default (err,req,res,next)=>{
    console.log(err)
    if(err instanceof apiErrors){
        if(err.status===401){
            return res.status(err.status).json({message:err.message,errorrs:err.errors,originalReq:{url:req.originalUrl,method:req.method,body:req.body}})
        }
        else return res.status(err.status).json({message:err.message,errors:err.errors})
    }
    return res.status(500).json({message:'unexpected error'})
}


