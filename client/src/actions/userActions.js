import { $api,$axios } from '../http(axios)/index.js'
import { Logout, SetUser } from '../reducers/userReducer.js'


export function registration(email, password) {
    return async dispatch => {
        try {
            const response = await $api.post(`/user/registration`, {
                email,
                password
            })
            console.log(response)
            dispatch(SetUser(response.data.user))
            localStorage.setItem('Access_token', response.data.user.access_token)
        }
        catch (e) {
            console.log(e.response.data)
            return alert(e.response.data.message)
        }

    }
}

export function authorization(email, password) {
    return async dispatch => {
        try {
            const response = await $api.post(`/user/authorization`, {
                email,
                password
            })
            console.log(response.data)
            dispatch(SetUser(response.data.user))
            localStorage.setItem('Access_token', response.data.user.access_token)
        }
        catch (e) {
            return alert(e.response.data.message)
        }
    }
}
let response
export function auth() {
    return async dispatch => {
        try {
            response = await $axios.get('/user/auth')
            console.log('response from action ',response)
            //console.log(response)
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

export function logout() {
    return async dispatch => {
        try {
            await $axios.get('/user/logout')
            localStorage.removeItem('Access_token')
            dispatch(Logout())
        }
        catch (e) {
           return alert(e)
        }
    }

}