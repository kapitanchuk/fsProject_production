import jwt from 'jsonwebtoken'
import Refresh from '../models/Refresh.js'
import dotenv from 'dotenv'
import apiErrors from '../exceptions/apiErrors.js'

dotenv.config()

class tokenService {
    async createTokens(payload) {
        const former_token = await Refresh.findOne({user:payload})
        if(former_token){
            await Refresh.deleteOne(former_token)
            //console.log(former_token)
        }
        const access_token = jwt.sign({ payload }, process.env.SECRET_ACCESS, { expiresIn: '30s' })
        const refresh_token = jwt.sign({ payload }, process.env.SECRET_REFRESH, { expiresIn: '30d' })
        return {
            access_token,
            refresh_token
        }
    }

    async saveRefresh(id, refreshToken) {
        const refreshData = await Refresh.findOne({ user: id })
        //проверяем, есть ли токен в хранилище. Если он был(к примеру мы могли зайти с другого устройства), то токен перезаписывается
        if (refreshData) {
            refreshData.token = refreshToken

            refreshData.save()

        }
        const newRefresh = new Refresh({ user: id, token: refreshToken })
        await newRefresh.save()
    }

    async deleteRefresh(refreshToken) {
        await Refresh.deleteOne({ refreshToken })

    }

    async refreshTokens(refreshToken) {
        const decoded = this.checkRefeshToken(refreshToken)
        console.log("decoded from refresh:",decoded)
        const tokens = this.createTokens(decoded)
        
        const { payload } = decoded
        this.saveRefresh(payload, tokens.refresh_token)


    }

    checkAccessToken(accessToken) {
        if(!accessToken){
            throw apiErrors.unAuthorized()
        }
        const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS)
        return decoded
    }

    checkRefeshToken(refreshToken) {
        if (!refreshToken) {
            throw apiErrors.InvalidToken('invalid token')
        }
        const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH)
        return decoded
    }



}

export default new tokenService()