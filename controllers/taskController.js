import {StatusCodes} from 'http-status-codes'

import { NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import day from 'dayjs';
import Task from '../models/TaskModel.js';


export const getAllTasks=async(req,res)=>{
  /*  const {search,taskStatus,taskType,sort,givenTo}=req.query
   const userIdString = '6687a1ae82fdb81c9b080389';
      const userId = new mongoose.Types.ObjectId(userIdString);
   const queryObject={
    createdBy:userId,
   
   }
  

   if(search){
    queryObject.$or = [
      { task: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } },
    ];
   }
   if (taskStatus && taskStatus !== 'all') {
    queryObject.taskStatus = taskStatus;
  }

  if (givenTo && givenTo !== 'all') {
    queryObject.givenTo = givenTo;
  }
  if (taskType && taskType !== 'all') {
    queryObject.taskType = taskType;
  }


  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;


const tasks=await Task.find(queryObject).sort(sortKey).skip(skip).limit(limit).populate({
  path:'givenTo',
  select:'name'
});
const totalTasks = await Task.countDocuments(queryObject)

const numOfPages = Math.ceil(totalTasks / limit); */
const tasks=await Task.find({}).populate({
  path:'givenTo',
  select:'name'
}).sort({ createdAt: -1 });


res.status(StatusCodes.OK).json({tasks})
}

export const createTask=async(req,res)=>{



   req.body.createdBy=req.user.userId

    const task=await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}


export const getTask=async(req,res)=>{
    const{id}=req.params

const task=await Task.findById(id)

res.status(200).json({task})
}

export const updateTask=async(req,res)=>{

    const{id}=req.params

    const updatedTask=await Task.findByIdAndUpdate(id,req.body,{
        new:true
    })

    
    return res.status(StatusCodes.OK).json({task:updatedTask})
}

export const deleteTask=async(req,res)=>{
    const {id}=req.params 

    const removedTasks=await Task.findByIdAndDelete(id)

   

    return res.status(StatusCodes.OK).json({msg:'task deleted!!!'})
}

export const showStats = async (req, res) => {
    let stats = await Task.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$taskStatus', count: { $sum: 1 } } },
      ]);
      stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
      }, {});

      const defaultStats = {
        pending: stats.pending || 0,
        accept: stats.accept || 0,
        declined: stats.declined || 0,
      };
    
  
      let monthlyTasks = await Task.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
      ]);

      monthlyTasks = monthlyTasks
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
  
        const date = day()
          .month(month - 1)
          .year(year)
          .format('MMM YY');
        return { date, count };
      })
      .reverse();
    res.status(StatusCodes.OK).json({ defaultStats, monthlyTasks });
  };



 