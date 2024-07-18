import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { ValidateLoginInput, ValidateRegisterInput } from "../middleware/validationMiddleware.js";

const router=Router()

router.post('/register',ValidateRegisterInput,  register)
router.post('/login',ValidateLoginInput,  login)
router.get('/logout',logout)

export default router