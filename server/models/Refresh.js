import mongoose from 'mongoose'


const Refresh = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    token:{type:String,required:true}
})

export default mongoose.model('Refresh',Refresh) 