import jwt from 'jsonwebtoken'
import Refresh from '../models/Refresh.js'
import dotenv from 'dotenv'
import apiErrors from '../exceptions/apiErrors.js'

dotenv.config()

class tokenService {
    async createTokens(payload) {
        const former_token = await Refresh.findOne({user:payload})
        if(former_token){
            await Refresh.deleteOne({former_token})
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

            await refreshData.save()
            return
        }
        const newRefresh = new Refresh({ user: id, token: refreshToken })
        await newRefresh.save()
    }

    async deleteRefresh(refreshToken) {
        this.checkRefeshToken(refreshToken)
        await Refresh.deleteOne({ refreshToken })

    }

    async refreshTokens(refreshToken) {
        const decoded = this.checkRefeshToken(refreshToken)
        
        const { payload } = decoded //extracting our user id (payload) from refresh token
        const tokens = await this.createTokens(payload)
        await this.saveRefresh(payload, tokens.refresh_token)
        return {tokens}

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
        try {
            const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH)
            return decoded
        } catch (e) {
            throw apiErrors.InvalidToken('invalid token')
        }
        
    }



}

export default new tokenService()