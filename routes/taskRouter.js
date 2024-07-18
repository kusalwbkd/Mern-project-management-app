import { Router } from "express";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware.js";
import {  validateParams, validateTaskInput, validateUpdateTaskInput } from "../middleware/validationMiddleware.js";
import { createTask, deleteTask, getAllTasks, getTask, showStats, updateTask } from "../controllers/taskController.js";



const router=Router()
//
router.route('/').get(authorizePermissions('admin'),getAllTasks).post(authorizePermissions("admin"),validateTaskInput ,createTask)

router.route('/stats').get(showStats)
router.route('/:id').get(validateParams,getTask).patch(validateParams,updateTask).delete(validateParams,deleteTask)

export default router