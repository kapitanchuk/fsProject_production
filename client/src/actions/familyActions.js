import { $axios } from "../http(axios)";
import { GetFamilies, SetCurrFamily } from "../reducers/familyReducer";

export const getFamilies=(options)=>{
    return async dispatch=>{
        try {
            const response = await $axios.get(`/family/getFamilies${options? `?options=true&min=${options.range[0]}&max=${options.range[1]}&half_board=${options.half_b}&free=${options.free}`:''}`)
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
            dispatch(SetCurrFamily(response.data))
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}

