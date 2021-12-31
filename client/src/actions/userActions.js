import { Logout, SetUser } from '../reducers/userReducer.js'
import axios from 'axios'




export function registration(email, password) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:4000/api/user/registration`, {
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
            const response = await axios.post(`http://localhost:4000/api/user/authorization`, {
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

export function auth() {
    return async dispatch => {
        try {

            const response = await axios.get('http://localhost:4000/api/user/auth', {
                headers: { Authorization: `Bearer ${localStorage.getItem('Access_token')}` }
            })

            //console.log(response)
            dispatch(SetUser(response.data.user))
            
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await axios.get('http://localhost:4000/api/user/logout')
            localStorage.removeItem('Access_token')
            dispatch(Logout())
        }
        catch (e) {
            console.log(e)
            return alert(e)
        }
    }

}