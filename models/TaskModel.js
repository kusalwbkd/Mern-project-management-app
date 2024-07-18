import mongoose from "mongoose";
import { TASK_STATUS, TASK_TYPE } from "../utils/constants.js";


const TaskSchema = new mongoose.Schema(
    {
      task: {
        type:String
      },
      givenTo: {
        type:mongoose.Types.ObjectId,
        ref:'User',
      },
      taskStatus: {
        type: String,
        enum: Object.values(TASK_STATUS),
        default: TASK_STATUS.PENDING,
      },
     taskType: {
        type: String,
        enum:Object.values(TASK_TYPE) ,
        default:TASK_TYPE.MEDIUM,
      },
      department: {
        type: String,
        default: 'my department',
      },

      createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',

      }
    },
    { timestamps: true }
  );


export default mongoose.model('Task',TaskSchema)