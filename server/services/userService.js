import User from "../models/User.js"
import apiErrors from '../exceptions/apiErrors.js'
import tokenService from "./tokenService.js"
import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'

class userService {
    async login(req) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw apiErrors.BadRequest('erros during registration',errors)
        }

        const { email, password } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw apiErrors.BadRequest('user with this email already exists')
            // throw new Error('test')
            // return res.status(400).json({message:"user with this email already exists"})
        }

        const hashedPassword = bcrypt.hashSync(password, 6)
        const user = new User({ email: email, password: hashedPassword })
        const tokens = await tokenService.createTokens(user._id)
        tokenService.saveRefresh(user._id,tokens.refresh_token)

        await user.save()
        return {
            ...tokens,
            user:user
        }
    }

    async authorize(req){
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            throw apiErrors.BadRequest('invalid email');
        }
        
        if(!bcrypt.compareSync(password,user.password)){
            throw apiErrors.BadRequest('incorrect password');
        } 

        const tokens = await tokenService.createTokens(user._id)
        tokenService.saveRefresh(user._id,tokens.refresh_token)
        return {
            ...tokens,
            user:user
        }
    }
}

export default new userService() // вызывая new мы точно знаем, что будет создан новый объект