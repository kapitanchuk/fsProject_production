import apiErrors from "../exceptions/apiErrors.js"
import Family from "../models/Family.js"

class familyService {
    async create(req) {
        // console.log('\n\n\n\nNEW REQUEST:\n\n\n\n\n',req)
        
        
        //REDO THAT STUFF


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
            cost: cost,
            free: free,
            photos: fileNamesArray
        })
        console.log("FAMILY", family)
        await family.save()
        return family

    }

    async getFamilies(req) {

        let { options,paginationOptions} = req.body


        let currItem = (paginationOptions.currPage - 1) * paginationOptions.limit;

        let totalNumber
        let families
        if (options) {
 
            families = await Family.aggregate([
                {$match:{$expr:{$cond:{if:options.free,then:{$eq:["$free",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.wifi,then:{$eq:["$conditions.wifi",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.separate_bath,then:{$eq:["$conditions.separate_bath",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.pets,then:{$eq:["$conditions.pets",false]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.kitchen,then:{$eq:["$conditions.kitchen",true]},else:{}}}}},

                {$match:{$expr:{$cond:{if:options.conditions.food.half_board,then:{$eq:["$conditions.food.half_board",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.food.only_breakfast,then:{$or:[{$eq:["$conditions.food.only_breakfast",true]},{$eq:["$conditions.food.half_board",true]}]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.registration,then:{$eq:["$registration",true]},else:{}}}}},
                {$match:{"cost.cost_without_food":{ $gte: parseInt(options.range[0]), $lte:parseInt(options.range[1])}}},
                {$sort:{"cost.cost_without_food":1,_id:1}},
                {$skip:currItem},
                {$limit:parseInt(paginationOptions.limit)}
            ])
            totalNumber = await Family.aggregate([
                {$match:{$expr:{$cond:{if:options.free,then:{$eq:["$free",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.wifi,then:{$eq:["$conditions.wifi",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.separate_bath,then:{$eq:["$conditions.separate_bath",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.pets,then:{$eq:["$conditions.pets",false]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.kitchen,then:{$eq:["$conditions.kitchen",true]},else:{}}}}},

                {$match:{$expr:{$cond:{if:options.conditions.food.half_board,then:{$eq:["$conditions.food.half_board",true]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.conditions.food.only_breakfast,then:{$or:[{$eq:["$conditions.food.only_breakfast",true]},{$eq:["$conditions.food.half_board",true]}]},else:{}}}}},
                {$match:{$expr:{$cond:{if:options.registration,then:{$eq:["$registration",true]},else:{}}}}},
                {$match:{"cost.cost_without_food":{ $gte: parseInt(options.range[0]), $lte:parseInt(options.range[1])}}},
                {$sort:{"cost.cost_without_food":1,_id:1}},
                
            ]).count("count");
            
            totalNumber=totalNumber[0].count;
            
        
        }
        else {
            families = await Family.find().sort({ "cost.cost_without_food":1,_id: 1 }).skip(paginationOptions.currItem).limit(parseInt(paginationOptions.limit))
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