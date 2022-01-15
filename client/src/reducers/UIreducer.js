const SHOWPOPUP = 'SHOWPOPUP'
const HIDEPOPUP = 'HIDEPOPUP'
const SET_MEMBERS = 'SET_MEMBERS'

const defaultState={
    showpopup:false,
    members:[]
}

export default function UIreducer(state=defaultState,action){
    switch(action.type){
        case SHOWPOPUP:
            return{...state,showpopup:true}
        case HIDEPOPUP:
            return{...state,showpopup:false}
        case SET_MEMBERS:
            return{...state,members:action.payload}
        default:
            return state
    }
}

export const ShowPopup = ()=>({type:SHOWPOPUP})
export const HidePopup = ()=>({type:HIDEPOPUP})
export const SetMembers = (members)=>({type:SET_MEMBERS,payload:members})
