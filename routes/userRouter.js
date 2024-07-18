import { Router } from "express";
import { getAllUsers, getCurrentUser, getMyTasks, getTaskStats, getUserTasks, showMyStats, showUserStats, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router=Router()

router.get('/current-user',getCurrentUser)
router.get('/get-all-users',authorizePermissions('admin'),getAllUsers)
router.get('/admin/app-stats', authorizePermissions('admin'), getTaskStats)
router.get('/myTasks',getMyTasks)
router.get('/myStats',showMyStats)
router.patch('/update-user',  validateUpdateUserInput,  updateUser)

router.get('/user-tasks/:id',authorizePermissions('admin'),getUserTasks)
router.get('/user-stats/:id',authorizePermissions('admin'),showUserStats)

export default router