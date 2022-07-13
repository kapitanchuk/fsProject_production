import User from "../models/User.js"
import apiErrors from '../exceptions/apiErrors.js'
import tokenService from "./tokenService.js"
import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'

class userService {
    async regist(req) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw apiErrors.BadRequest('erros during registration',errors)
        }

        const { email, password,name,lastName } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw apiErrors.BadRequest('user with this email already exists')
            // throw new Error('test')
            // return res.status(400).json({message:"user with this email already exists"})
        }

        const hashedPassword = bcrypt.hashSync(password, 6)
        const user = new User({ email: email, password: hashedPassword,firstName:name,lastName:lastName })
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
        const user = await User.findOne({email})
        console.log(user)
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

    async update(req){
        const {firstName,lastName,gender} = req.body;
        const user = await User.findOne({_id:req.user.payload})
        user.firstName = firstName;
        user.lastName = lastName;
        user.gender = gender;
        user.save()
        return user
    }

    async getUsers(){
        const users = await User.find()
        if(!users){
            throw apiErrors.BadRequest('Users are not found')
        }
        return {
            users
        }
    }

    async findUser(req){
        const user = await User.findOne({_id:req.payload})
        return user
    }
}

export default new userService()