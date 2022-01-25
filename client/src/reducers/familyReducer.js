const GET_FAMILIES='GET_FAMILIES'
const SET_CURRENT_FAMILY='SET_CURRENT_FAMILY'
const SET_TOTAL_NUMBER='SET_TOTAL_NUMBER'
const SET_CURR_PAGE='SET_CURR_PAGE'


const defaultState={
    families:[],
    currFamily:{},
    totalNumber:0,
    currPage:1,
    limit:3
    
}

export default function familyReducer(state=defaultState,action){
    switch(action.type){
        case GET_FAMILIES:
            return{...state,families:action.payload}
        case SET_CURRENT_FAMILY:
            return{...state,currFamily:action.payload}
        case SET_TOTAL_NUMBER:
            return{...state,totalNumber:action.payload}
        case SET_CURR_PAGE:
            return{...state,currPage:action.payload}
        default:
            return state
    }
}

export const GetFamilies=families=>({type:GET_FAMILIES,payload:families})
export const SetCurrFamily=family=>({type:SET_CURRENT_FAMILY,payload:family})
export const SetTotalCount = number =>({type:SET_TOTAL_NUMBER,payload:number})
export const SetCurrPage = currpage =>({type:SET_CURR_PAGE,payload:currpage})
