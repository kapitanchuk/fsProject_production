import dotenv from 'dotenv'
import userService from '../services/userService.js'
import tokenService from '../services/tokenService.js'

dotenv.config()

class userController {
    async registration(req, res, next) {
        try {
            const user = await userService.regist(req)

            res.cookie('Refresh_token', user.refresh_token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
            
            return res.json({ user })
        } catch (e) {
            next(e)
        }
    }

    async authorization(req, res, next) {
        try {
            //использование токена:
            // access token храниться на клиентской части приложения
            //токен предоставляет безопасность тем, что имеет подпись(состоит из payload, header и кодируется специальным ключём, который знает только сервер)
            //тоесть при запросе мы проверяем токен, а именно не изменилась ли подпись (тоесть не изминились ли данные или секретный ключ)
            // если данные были изменены, значит также полностью поменялась подпись, из этого мы делаем вывод, что была проведена подмена.

            // но access token могут украсть, поетому его время жизни должно быть небольшим и чтобы создавать новый токен доступа  используем refresh token
            
            const user = await userService.authorize(req)

            res.cookie('Refresh_token', user.refresh_token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })

            return res.json({ user })

        } catch (e) {
            next(e)
        }
    }

    async getAll(req,res,next){
        try {
            const users = await userService.getUsers()
            return res.json({users})
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            
            const { Refresh_token } = req.cookies
            console.log(Refresh_token)
            await tokenService.deleteRefresh(Refresh_token)
            res.clearCookie('Refresh_token')
            return res.json({ message: 'logouted' })
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { Refresh_token } = req.cookies
            
            const tokens = await tokenService.refreshTokens(Refresh_token)

            return res.json({tokens})
        } catch (e) {
            next(e)
        }
    }

    async auth(req,res,next){
        try{
            const user = req.user;
            return res.status(200).json({user});
        }
        catch(e){
            next(e)
        }
    }
}

export default new userController()