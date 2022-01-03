import axios from 'axios'
//custom instance defaults
//will be applied to every request


export const $api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true //in order to be able to attach cookies to every request
})



$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Access_token')}`
    return config
})


export const $axios = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true //in order to be able to attach cookies to every request
})

$axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Access_token')}`
    return config
})
$axios.interceptors.response.use(config => {
    console.log(config)
    return config
}
    , err => {
        if (err.response.status === 401) {

            return $api.get('user/refresh')
                .then(response => {
                    localStorage.setItem('Access_token', response.data.tokens.tokens.access_token)

                    return $api.get('user/auth')
                        .then(final => {
                            // console.log('FINAL ',final)
                            return final
                        })
                        .catch(finalErr => {
                            return Promise.reject(finalErr)//final error
                        })
                })
                .catch(error => {
                    return Promise.reject(error)//if refresh token deprecated, or something else
                })
        }
        return Promise.reject(err)//if error status != 401
    }
)

