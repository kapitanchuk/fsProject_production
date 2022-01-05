const GET_FAMILIES='GET_FAMILIES'
const SET_CURRENT_FAMILY='SET_CURRENT_FAMILY'

const defaultState={
    families:[],
    currFamily:{}
}

export default function familyReducer(state=defaultState,action){
    switch(action.type){
        case GET_FAMILIES:
            return{...state,families:action.payload}
        case SET_CURRENT_FAMILY:
            return{...state,currFamily:action.payload}
        default:
            return state
    }
}

export const GetFamilies=families=>({type:GET_FAMILIES,payload:families})
export const SetCurrFamily=family=>({type:SET_CURRENT_FAMILY,payload:family})