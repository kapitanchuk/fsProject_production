const GET_FAMILIES='GET_FAMILIES'

const defaultState={
    families:[]
}

export default function familyReducer(state=defaultState,action){
    switch(action.type){
        case GET_FAMILIES:
            return{...state,families:action.payload}
        default:
            return state
    }
}

export const GetFamilies=families=>({type:GET_FAMILIES,payload:families})