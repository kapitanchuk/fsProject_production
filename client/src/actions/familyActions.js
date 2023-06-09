import { $axios } from "../http(axios)";
import { GetFamilies, SetCurrFamily, SetTotalCount } from "../reducers/familyReducer";

export const getFamilies=(options,paginationOptions)=>{
    return async dispatch=>{
        try {
            const response = await $axios.post(`/family/getFamilies`,{
                options,
                paginationOptions
            })
            // let correctOptions={}
            // for(const option of options){
            //     if(option!==false){
            //         correctOptions.
            //     }
            // }
            // const response = await $axios.post(`/family/getFamilies?currPage=${paginationOptions.currPage}&limit=${paginationOptions.limit}`,{

            // })
            console.log(response.data)
            dispatch(GetFamilies(response.data.families))
            dispatch(SetTotalCount(response.data.totalNumber))
        } catch (e) {
            console.error(e)
            // console.log(e?.response?.data.message)
            
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

