import { StatusCodes } from "http-status-codes"
import User from '../models/UserModel.js'

import cloudinary from 'cloudinary';
import { formatImage } from "../middleware/multerMiddleware.js";
import Task from "../models/TaskModel.js";
import mongoose from "mongoose";
import day from 'dayjs';



export const getCurrentUser=async(req,res)=>{
    const user=await User.findOne({_id:req.user.userId}).select('-password')
    res.status(StatusCodes.OK).json({user})
}

export const getAllUsers=async(req,res)=>{
  const users=await User.find({})
  res.status(StatusCodes.OK).json({users})
}

export const getTaskStats=async(req,res)=>{
    const users=await User.countDocuments()

    const tasks=await Task.countDocuments()
    res.status(StatusCodes.OK).json({users,tasks})
}

export const updateUser=async(req,res)=>{
   
  const user = await User.findByIdAndUpdate(req.user.userId, req.body,{
    new:true,
  });

  res.status(StatusCodes.OK).json({user})

 
}


export const getUserTasks=async(req,res)=>{

 
  const tasks=await Task.find({givenTo:req.params.id})
  return res.status(StatusCodes.OK).json({tasks}) 
}

export const showUserStats = async (req, res) => {
let stats = await Task.aggregate([
    { $match: { givenTo: new mongoose.Types.ObjectId(req.params.id) } },
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

export const getMyTasks=async(req,res)=>{
  const {search,taskStatus,taskType,sort}=req.query
  const userIdString = '6687a1ae82fdb81c9b080389';
  const userId = new mongoose.Types.ObjectId(userIdString);
  
  const queryObject={
   createdBy:userId,
  givenTo:req.user.userId
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
  
  
  const tasks=await Task.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  const totalTasks = await Task.countDocuments(queryObject)
  
  const numOfPages = Math.ceil(totalTasks / limit);
  res.status(StatusCodes.OK).json({totalTasks,tasks,numOfPages,currentPage:page})
  }

export const showMyStats = async (req, res) => {
let stats = await Task.aggregate([
    { $match: { givenTo: new mongoose.Types.ObjectId(req.user.userId) } },
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
    { $match: { givenTo: new mongoose.Types.ObjectId(req.user.userId) } },
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