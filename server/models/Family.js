import mongoose from 'mongoose'

const Family = mongoose.Schema({
    modifier:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    district:{type:String,required:true},
    property_type:{type:String,required:true},
    accomodation_type:{type:String,required:true},
    contacts:{type:String},
    adress:{type:String,required:true,unique:true},
    registration:{type:Boolean,required:true},
    conditions:{
        wifi:{type:Boolean,required:true,default:false},
        separate_bath:{type:Boolean,required:true,default:false},
        food:{
            half_board:{type:Boolean},
            only_breakfast:{type:Boolean},
            no_nutrition_provided:{type:Boolean,required:true,default:true}
        },
        pets:{type:Boolean,required:true,default:false},
        kitchen:{type:Boolean,required:true,default:false},
    },
    description:{type:String,maxLength:500},
    other:{type:String,maxLength:500},
    cost:{
        cost_without_food:{type:String,required:true},
        cost_with_food:{type:String,required:true}
    },
    free:{type:mongoose.Schema.Types.Mixed,default:true},
    photos:[{type:String}]
})

export default mongoose.model('Family',Family)

