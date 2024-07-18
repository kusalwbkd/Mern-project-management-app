import{body,validationResult,param} from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js'

import mongoose from 'mongoose';
import Job from '../models/TaskModel.js';
import User from '../models/UserModel.js';
import Task from '../models/TaskModel.js';
import { TASK_STATUS, TASK_TYPE } from '../utils/constants.js';

const withValidationErrors=(validateValues)=>{
    return[validateValues,(req,res,next)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            const errorMessages=errors.array().map((error)=>error.msg);
            if(errorMessages[0].startsWith('No task')){
                throw new NotFoundError(errorMessages)
            }
            if(errorMessages[0].startsWith('Not authorized')){
              throw new UnauthorizedError(errorMessages)
          }

    
            throw new BadRequestError(errorMessages)
        }

        next()
    }]
}


export const validateTaskInput=withValidationErrors([
    body('task').notEmpty().withMessage('task name is required'),
    body('department').notEmpty().withMessage('department name is required'),
    body('taskStatus').isIn(Object.values(TASK_STATUS)).withMessage('invalid task status'),
    body('taskType').isIn(Object.values(TASK_TYPE)).withMessage('invalid task type'),
    body('givenTo').notEmpty().withMessage('given to field is required').isMongoId().withMessage('this is not a valid mongo id').
    custom(async(value,{req})=>{
      const user = await User.findById( value );
      if (!user ) {
        throw new Error('Invalid user');
      }

    })

 /*   ,
      */
])

export const validateUpdateTaskInput=withValidationErrors([
  body('task').notEmpty().withMessage('task name is required'),
    body('department').notEmpty().withMessage('department name is required'),
    body('taskStatus').isIn(Object.values(TASK_STATUS)).withMessage('invalid task status'),
    body('taskType').isIn(Object.values(TASK_TYPE)).withMessage('invalid task type')
   // body('givenTo').notEmpty().withMessage('given to field is required').isMongoId().withMessage('this is not a valid mongo id').
    .custom(async(value,{req})=>{
      const user = await User.findById( value );
      if (!user ) {
        throw new Error('Invalid user');
      }

    })

/*   ,
    */
])


export const validateParams=withValidationErrors([

    param('id').custom(async(value,{req})=>{
        
     const isValid= mongoose.Types.ObjectId.isValid(value)

     if(!isValid) throw new BadRequestError('invalid mongodb id')

     const task=await Task.findById(value)

     if(!task) throw new NotFoundError(`No task with ${value}`)
     const isAdmin=req.user.role === 'admin'
   
    if(!isAdmin ){
   throw new UnauthorizedError('Not authorized to access this route')
    }
    })
])

export const ValidateRegisterInput=withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
    body('department').notEmpty().withMessage('department is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
])


export const ValidateLoginInput=withValidationErrors([
 
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),

    body('password')
      .notEmpty()
      .withMessage('password is required')
      
])


export const validateUpdateUserInput=withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('department').notEmpty().withMessage('department is required'),
])
