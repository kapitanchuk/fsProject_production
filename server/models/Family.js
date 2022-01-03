import mongoose from 'mongoose'

const Family = mongoose.Schema({
    modifier:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    members:[{type:String,required:true}],
    contacts:{type:String,required:true},
    adress:{type:String,required:true,unique:true},
    languages:{type:[String],default:['German']},
    description:{type:String,maxLength:500},
    registration:{type:Boolean,required:true,default:true},
    living_conditions:{type:String,maxLength:500},
    half_board:{type:Boolean,required:true},
    cost:{type:Number,required:true},
    free:{type:mongoose.Schema.Types.Mixed,default:true},
    photos:[{type:String}]
})

export default mongoose.model('Family',Family)

