import { $axios } from "../http(axios)";
import { GetFamilies } from "../reducers/familyReducer";

export const getFamilies=(German)=>{
    return async dispatch=>{
        try {
            const response = await $axios.get(`/family/getFamilies${German? `?language=${German}`:''}`)
            console.log(response)
            dispatch(GetFamilies(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            
        }
      

    }
}

