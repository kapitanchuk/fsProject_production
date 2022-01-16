import mongoose from 'mongoose'

const User = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String},
    admin:{type:Boolean,default:false}
})

export default mongoose.model('User',User)