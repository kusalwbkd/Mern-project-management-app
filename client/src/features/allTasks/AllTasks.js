import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";



const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    taskGivenTo:'all'
  };

  const initialState = {
    isLoading: false,
    tasks: [],
    filterd_tasks:[],
    totalTasks: 0,
    numOfPages: 1,
    page: 1,
    defaultStats: {},
    monthlyTasks: [],
    ...initialFiltersState,
  };

  export const getAllTasks=createAsyncThunk('allTasks/getAllTasks',async(_,thunkAPI)=>{
  try {
    const response=await customFetch.get('/tasks')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
  })

  export const getStat=createAsyncThunk('allTasks/getTaskStats',async(_,thunkAPI)=>{
    try {
      const response=await customFetch.get('/tasks/stats')
     console.log(response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    })
  



  const allTasksSlice = createSlice({
    name: 'allTasks',
    initialState,
    extraReducers:(builder)=>{
     builder.addCase(getAllTasks.pending,(state)=>{
      state.isLoading=true
     }),
     builder.addCase(getAllTasks.fulfilled,(state,{payload})=>{
      state.isLoading=false
      state.tasks=payload.tasks
     state.filterd_tasks=payload.tasks

     }),
     builder.addCase(getAllTasks.rejected,(state,{payload})=>{
      state.isLoading = false;
      toast.error(payload);
     }),
     builder.addCase(getStat.pending,(state)=>{
      state.isLoading=true
     }),
     builder.addCase(getStat.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.defaultStats = payload.defaultStats;
      state.monthlyTasks = payload.monthlyTasks;
     }),
     builder.addCase(getStat.rejected,(state,{payload})=>{
      state.isLoading = false;
      toast.error(payload);
     })

    },



    reducers:{
      updateFilters:(state,{payload})=>{
  let temp_tasks=[...state.tasks]
  

const {search,searchStatus,searchType,taskGivenTo,sort}=payload.values

if(search !==''){
  temp_tasks = temp_tasks.filter((item) =>
    item.task.toLowerCase().startsWith(search)
  )
}

if(searchStatus !=='all'){
  temp_tasks = temp_tasks.filter(
    (item) => item.taskStatus === searchStatus
  )
}
if(searchType !=='all'){
  temp_tasks = temp_tasks.filter(
    (item) => item.taskType === searchType
  )
}

if(taskGivenTo !=='all'){
  temp_tasks = temp_tasks.filter(
    (item) => item.givenTo._id === taskGivenTo
  )
}

if(sort === 'a-z'){
  temp_tasks = temp_tasks.sort((a, b) => {
    return a.task.localeCompare(b.task);
  });
}
if(sort === 'z-a'){
  temp_tasks = temp_tasks.sort((a, b) => {
    return b.task.localeCompare(a.task);
  });
}

if (sort === 'latest') {
  temp_tasks = temp_tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
if (sort === 'oldest') {
  temp_tasks = temp_tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

state.filterd_tasks=temp_tasks
      },
      clearFilterValues: (state) => {
        return { ...state, ...initialFiltersState };
      },

    }
  });



  export const {updateFilters,clearFilterValues } = allTasksSlice.actions

  export default allTasksSlice.reducer;