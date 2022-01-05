import { Router } from "express";
import familyController from "../controllers/familyController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
const router = Router()

router.post('/create',authMiddleware,familyController.create)
router.get('/getFamilies',authMiddleware,familyController.fetchFamilies)
router.get('/getFamily',authMiddleware,familyController.getFamily)

export default router