import apiErrors from "../exceptions/apiErrors.js"
import Family from "../models/Family.js"

class familyService {
    async create(req) {
        // console.log('\n\n\n\nNEW REQUEST:\n\n\n\n\n',req)
        let { members, contacts, adress, description, living_conditions, half_board, cost, free } = req.body
        const candidate = await Family.findOne({ adress: adress })
        if (candidate) {
            throw apiErrors.BadRequest('family with this adress already registered')
        }

        let fileNamesArray = []
        if (req.files) {
            const url = req.protocol + '://' + req.get('host')
            fileNamesArray = req.files.map(file => url + '/public/' + file.filename)
        }

        if (free === "true") {
            free = JSON.parse(free)
        }
        const family = new Family({
            modifier: req.user.payload,
            members: members,
            contacts: contacts,
            adress: adress,
            description: description,
            living_conditions: living_conditions,
            half_board: half_board,
            cost: cost,
            free: free,
            photos: fileNamesArray
        })
        console.log("FAMILY", family)
        await family.save()
        return family


    }

    async getFamilies(req) {

        //maybe it would be better to set post request and get all options by req.body
        let { options, min, max, half_board,free ,currPage, limit } = req.query


        let currItem = (currPage - 1) * limit;

        let totalNumber
        let families
        if (options) {

            free = JSON.parse(free)
            half_board=JSON.parse(half_board)
            
            //figure out later how aggregate works  
            families = await Family.aggregate([
                {$match:{$expr:{$cond:{if:free,then:{$eq:["$free",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:half_board,then:{$eq:["$half_board",true]},else:{}}}}},
                {$match:{cost:{ $gte: parseInt(min), $lte:parseInt(max)}}}
            ])
            totalNumber=1;
            

        }
        else {
            families = await Family.find().sort({ _id: 1 }).skip(currItem).limit(parseInt(limit))
            totalNumber = await Family.find().count()
        }

        // console.log(families)
        return { families: families, totalNumber: totalNumber }
    }

    async getFamily(req) {
        const id = req.query.id
        if (!id) {
            throw apiErrors.BadRequest('ID is not identified')
        }
        const family = await Family.findOne({ _id: id })
        if (!family) {
            throw apiErrors.BadRequest('Invalid ID')
        }
        return family
    }

    async delete(req) {
        // const familly = await Family.findByIdAndDelete(req.query.id)

    }
}

export default new familyService