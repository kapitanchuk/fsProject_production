import axios from 'axios'
//custom instance defaults
//will be applied to every request


export const $axios = axios.create({
    baseURL: 'http://localhost:4000/api/user',
    withCredentials: true //in order to be able to attach cookies to every request
})



$axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Access_token')}`
    return config
})


export const $axiosAuth = axios.create({
    baseURL: 'http://localhost:4000/api/user',
    withCredentials: true //in order to be able to attach cookies to every request
})

$axiosAuth.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Access_token')}`
    return config
})
$axiosAuth.interceptors.response.use(config => {
    console.log(config)
    return config
}
    , err => {
        if (err.response.status === 401) {

            return $axios.get('/refresh')
                .then(response => {
                    localStorage.setItem('Access_token', response.data.tokens.tokens.access_token)
                    console.log('FUCKING ACCESS TOKEN FROM LOCAL', localStorage.getItem('Access_token'))

                    return $axios.get('/auth')
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

