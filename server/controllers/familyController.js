import familyService from "../services/familyService.js"


class familyController{
    async create(req,res,next){
        try {
            const family = await familyService.create(req)
            return res.json({family})
        } catch (e) {
            next(e)
        }
    }

    async fetchFamilies(req,res,next){
        try{
            const families = await familyService.getFamilies(req)
            return res.json({families})
        }
        catch(e){
            next(e)
        }
    }

    async getFamily(req,res,next){
        try {
            const family = await familyService.getFamily(req)
            return res.json({family})
        } catch (e) {
            next(e)
        }
    }
    
    async delete(req,res,next){
        try {
            await familyService.delete(req)
        } catch (e) {
            next(e)
        }
    }
}

export default new familyController