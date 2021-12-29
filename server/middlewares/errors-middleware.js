import apiErrors from '../exceptions/apiErrors.js'


export default (err,req,res,next)=>{
    console.log(err)
    if(err instanceof apiErrors){
        return res.status(err.status).json({message:err.message,errorrs:err.errors})
    }
    return res.status(500).json({message:'unexpected error'})
}


