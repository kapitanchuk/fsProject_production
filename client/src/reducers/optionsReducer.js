
const CHANGE_CONDITIONS = 'SET_CONDITIONS'
const CHANGE_FREE = 'CHANGE_FREE'
const SET_REGISTRATION = 'SET_REGISTRATION'
const SET_RANGE = 'SET_RANGE'
const CHANGE_FOOD = 'CHANGE_FOOD'



const defaultState = {
    conditions:{
        wifi:false,
        separate_bath:false,
        food:{
            half_board:false,
            only_breakfast:false,
        },
        pets:false,
        kitchen:false,
    },
    registration:false,
    free:false,
    //max range number has to be pulled from a database (family with a largest housing price)
    range: [0,1000]
}

export default function(state = defaultState,action){
    switch(action.type){
        case CHANGE_CONDITIONS:
            return{...state,conditions:{...state.conditions,[action.value]:action.payload}}
        case CHANGE_FOOD:
            return{...state,conditions:{...state.conditions,food:{...state.conditions.food,[action.value]:action.payload}}}
        case CHANGE_FREE:
            return{...state,free:action.payload}
        case SET_REGISTRATION:
            return{...state,registration:action.payload}
        case SET_RANGE:
                return{...state,range:action.payload}
        default: return state
    }
}

export const change_conditions = (conditions,change)=>({type:CHANGE_CONDITIONS,payload:conditions,value:change})
export const change_food = (food,change)=>({type:CHANGE_FOOD,payload:food,value:change})
export const change_registration = registration=>({type:SET_REGISTRATION,payload:registration})
export const change_free = free =>({type:CHANGE_FREE,payload:free})
export const change_range = range =>({type:SET_RANGE,payload:range})
