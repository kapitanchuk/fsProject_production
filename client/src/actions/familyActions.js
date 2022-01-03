import { $axios } from "../http(axios)";
import { GetFamilies } from "../reducers/familyReducer";

export const getFamilies=()=>{
    return async dispatch=>{
        try {
            const response = await $axios.get('/family/getFamilies')
            console.log(response)
            dispatch(GetFamilies(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            
        }
      

    }
}