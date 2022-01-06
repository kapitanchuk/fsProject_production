import apiErrors from "../exceptions/apiErrors.js"
import Family from "../models/Family.js"

class familyService {
    async create(req) {
        const { members, contacts, adress, languages, description, living_conditions, half_board, cost, free, photos } = req.body
        const candidate = await Family.findOne({ adress: adress })
        if (candidate) {
            throw apiErrors.BadRequest('family with this adress already registered')
        }

        const family = new Family({ modifier: req.user.payload, members, contacts, adress, languages, description, living_conditions, half_board, cost, free, photos })
        family.save()
        return family
    }

    async getFamilies(req) {

        //maybe it would be better to set post request and get all options by req.body

        const options = req.query.options
        const min = req.query.min
        const max = req.query.max
        const half_board = req.query.half_board
        const free = req.query.free



        let families
        if (options) {
            families = await Family.find({half_board: half_board })
            if (free) {
                families = families.filter(item => item.free === JSON.parse(free))
            }
            families = families.filter(item => item.cost > min && item.cost < max)


            // families = families.filter(family=>{return family.languages.includes('German')})

        }
        else {
            families = await Family.find()
        }

        return families
    }

    async getFamily(req){
        const id = req.query.id
        if(!id){
            return apiErrors.BadRequest('ID is not identified')
        }
        const family = await Family.findOne({_id:id})
        if(!family){
            return apiErrors.BadRequest('Invalid ID')
        }
        return family
    }

    async delete(req) {
        // const familly = await Family.findByIdAndDelete(req.query.id)

    }
}

export default new familyService