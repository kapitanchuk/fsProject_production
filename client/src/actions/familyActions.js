import { $axios } from "../http(axios)";
import { GetFamilies, SetCurrFamily } from "../reducers/familyReducer";

export const getFamilies=(options)=>{
    return async dispatch=>{
        try {
            const response = await $axios.get(`/family/getFamilies${options? `?options=true&min=${options.min}&max=${options.max}&half_board=${options.half_b}&free=${options.free}`:''}`)
            dispatch(GetFamilies(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            
        }
      

    }
}

export const setCurrFamily=(id)=>{
    return async dispatch=>{
        try {
            const response = await $axios.get(`/family/getFamily?id=${id}`)
            console.log('curr family:',response)
            dispatch(SetCurrFamily(response.data))
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}

