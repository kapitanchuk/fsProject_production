const SHOWPOPUP = 'SHOWPOPUP'
const HIDEPOPUP = 'HIDEPOPUP'
const SET_MEMBERS = 'SET_MEMBERS'
const SET_PHOTOS = 'SET_PHOTOS'
const SET_REGISTRATION_ERROR = 'SET_REGISTRATION_ERRORS'
const REMOVE_REGISTRATION_ERROR = 'REMOVE_REGISTRATION_ERROR'
const CLEAR_REGISTRATION_ERRORS = 'CLEAR_REGISTRATION_ERRORS'
const SET_OPTIONS_MENU_VISIBILITY = "SWITCH_OPTIONS_MENU_VISIBILITY"
const SET_SIDEBAR_VISIBILITY = "SET_SIDEBAR_VISIBILITY"


const defaultState={
    registration_errors:{
        name:{value:false,message:""},
        lastname:{value:false,message:""},
        email:{value:false,message:""},
        password:{value:false,message:""},
    },
    options_menu:false,
    show_sidebar:false,
    showpopup:false,
    members:[],
    photos:[]
}

export default function UIreducer(state=defaultState,action){
    switch(action.type){
        case SHOWPOPUP:
            return{...state,showpopup:true}
        case HIDEPOPUP:
            return{...state,showpopup:false}
        case SET_OPTIONS_MENU_VISIBILITY:
            return{...state,options_menu:action.payload}    
        case SET_SIDEBAR_VISIBILITY:
            return{...state,show_sidebar:action.payload}
        case SET_MEMBERS:
            return{...state,members:action.payload}
        case SET_PHOTOS:
            return{...state,photos:[...state.photos,action.payload]}
        case SET_REGISTRATION_ERROR:
            return{...state,registration_errors:{...state.registration_errors,[action.error]:{value:action.payload,message:action.message}}}
        case REMOVE_REGISTRATION_ERROR:
            return{...state,registration_errors:{...state.registration_errors,[action.error]:{value:false,message:""}}}
        case CLEAR_REGISTRATION_ERRORS:
            return{...state,registration_errors:{"name.value":false,"lastname.value":false,"email.value":false,"password.value":false}}
        default:
            return state
    }
}

export const ShowPopup = ()=>({type:SHOWPOPUP})
export const HidePopup = ()=>({type:HIDEPOPUP})
export const SetOptionsMenuVisibility = (value)=>({type:SET_OPTIONS_MENU_VISIBILITY,payload:value})
export const SetSiderbarVisibility = (value) =>({type:SET_SIDEBAR_VISIBILITY,payload:value})
export const SetMembers = (members)=>({type:SET_MEMBERS,payload:members})
export const SetPhotos = (photo) =>({type:SET_PHOTOS,payload:photo})
export const SetRegistrationError = (error,value,message) =>({type:SET_REGISTRATION_ERROR,payload:value,error,message})
export const RemoveRegistrationError = (error) =>({type:REMOVE_REGISTRATION_ERROR,error})
export const ClearRegistrationErrors = () =>({type:CLEAR_REGISTRATION_ERRORS})
