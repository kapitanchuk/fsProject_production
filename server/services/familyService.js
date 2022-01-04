import apiErrors from "../exceptions/apiErrors.js"
import Family from "../models/Family.js"

class familyService{
    async create(req){
        const {members,contacts,adress,languages,description,registration,living_conditions,half_board,cost,free,photos} = req.body
        const candidate = await Family.findOne({adress:adress})
        if(candidate){
            throw apiErrors.BadRequest('family with this adress already registered')
        }

        const family = new Family({modifier:req.user.payload,members,contacts,adress,languages,description,registration,living_conditions,half_board,cost,free,photos})
        family.save()
        return family
    }

    async getFamilies(req){
        let language = req.query.language
        let families
        if(language){
            language = 'German'
            families = await Family.find({languages:language})
            
        }
        else{
            families = await Family.find()
        }

        return families
        

    }

    async delete(req){
        // const familly = await Family.findByIdAndDelete(req.query.id)

    }
}

export default new familyService