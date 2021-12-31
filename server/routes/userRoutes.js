import { Router } from "express";
import userController from "../controllers/userController.js";
import { check} from 'express-validator'
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router()

router.post('/registration',[
    check('email','invalid email').isEmail(),
    check('password','4 or more characters').isLength({min:4})
],userController.registration)
router.post('/authorization',userController.authorization)
router.get('/logout',userController.logout)
router.get('/refresh',userController.refresh)
router.get('/getUsers',authMiddleware,userController.getAll)
router.get('/auth',authMiddleware,userController.auth)

export default router