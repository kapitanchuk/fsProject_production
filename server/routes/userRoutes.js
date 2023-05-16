import { Router } from "express";
import userController from "../controllers/userController.js";
import { check} from 'express-validator'
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router()

router.post('/registration',[
    check('email','Input a valid email address').isEmail(),
    check('password','Password must be longer than 4 characters').isLength({min:4})
],userController.registration)
router.post('/authorisation',userController.authorisation)
router.get('/logout',userController.logout)
router.get('/refresh',userController.refresh)
router.get('/getUsers',authMiddleware,userController.getAll)
router.get('/auth',authMiddleware,userController.auth)
router.put('/update',authMiddleware,userController.update)

export default router