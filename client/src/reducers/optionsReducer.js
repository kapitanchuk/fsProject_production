const CHANGE_HALF_B = 'CHANGE_HALF_B'
const CHANGE_FREE = 'CHANGE_FREE'
const SET_RANGE = 'SET_RANGE'

const defaultState = {
    half_b:false,
    free:false,
    range:[0,1000]
}

export default function(state = defaultState,action){
    switch(action.type){
        case CHANGE_HALF_B:
            return{...state,half_b:action.payload}
        case CHANGE_FREE:
            return{...state,free:action.payload}
        case SET_RANGE:
            return{...state,range:action.payload}
        default: return state
    }
}

export const change_half = half =>({type:CHANGE_HALF_B,payload:half})
export const change_free = free =>({type:CHANGE_FREE,payload:free})
export const set_range = range =>({type:SET_RANGE,payload:range})
