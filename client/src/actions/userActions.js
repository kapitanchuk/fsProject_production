import { $axios } from '../http(axios)/index.js'
import { SetRegistrationError } from '../reducers/UIreducer.js'
import { Logout, SetUser } from '../reducers/userReducer.js'


export function registration(email, password,name,lastName) {
    return async dispatch => {
        try {
            const response = await $axios.post(`/user/registration`, {
                email,
                password,
                name,
                lastName
            })
            dispatch(SetUser(response.data.user.user))
            localStorage.setItem('Access_token', response.data.user.access_token)
        }
        catch (e) {
            console.log(e.response.data)
            const errors = e.response.data.errors.errors;
            errors.map(error=>dispatch(SetRegistrationError(error.param,true,error.msg)))
            
            // return alert(e.response.data.message)
        }

    }
}

export function authorisation(email, password) {
    return async dispatch => {
        try {
            const response = await $axios.post(`/user/authorisation`, {
                email,
                password
            })
            dispatch(SetUser(response.data.user.user))
            localStorage.setItem('Access_token', response.data.user.access_token)
        }
        catch (e) {
            return alert(e.response.data.message)
        }
    }
}

export function auth() {
    return async dispatch => {
        try {
            let response = await $axios.get('/user/auth')
            dispatch(SetUser(response.data.user))
            
        }
        catch (e) {
            console.log(e.response.data.message)
            
            //setTimeot(()=>console.log('AFTER TIMEOUT: ',response),1000)
            //console.log('response',response)
        //     setTimeout(()=>{if(response){
        //         console.log(response)
        //     }else{
        //         console.log('no response')
        //     }
        // },1000)
            //alert(e.response.data.message)
        }
    }
}

export function update(firstName,lastName,gender){
    return async dispatch=>{
        try {
            const response = await $axios.put('user/update',{firstName,lastName,gender})
            //console.log(response.data)
            dispatch(SetUser(response.data.user))
        } catch (e) {
            console.error(e.response?.data)
            alert(e.response?.data?.message)
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await $axios.get('/user/logout')
            localStorage.removeItem('Access_token')
            // dispatch(change_free(false))
            // dispatch(change_half(false))
            // dispatch(set_min(10))
            // dispatch(set_max(1000))
            dispatch(Logout())
        }
        catch (e) {
           return alert(e)
        }
    }

}