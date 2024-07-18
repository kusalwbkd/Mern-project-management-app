import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
import { getAllTasks } from "../allTasks/AllTasks";


const initialState = {
    isLoading: false,
    task: '',
    department: '',
    givenTo: '',
    taskTypeOptions: ['urgent', 'medium', 'low'],
    taskType: 'urgent',
    statusOptions: ['pending', 'declined', 'accept'],
    taskStatus: 'pending',
    isEditing: false,
    editTaskId: '',
  };


  export const createTask=createAsyncThunk('task/createTask',async(tasks,thunkAPI)=>{
    try {
      const response=await customFetch.post('/tasks',tasks)
      thunkAPI.dispatch(clearValues());
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.msg)

    }
  })

export const deleteTask=createAsyncThunk('task/deleteTask',async(taskId,thunkAPI)=>{
  try {
  const response=  await customFetch.delete(`/tasks/${taskId}`)
  toast.success('task deleted!!!')
   thunkAPI.dispatch(getAllTasks())
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})

export const editTask=createAsyncThunk('task/editTask',async({ taskId, task },thunkAPI)=>{
   try {
   const resp=await customFetch.patch(`/tasks/${taskId}`,task)
   thunkAPI.dispatch(clearValues());
      return resp.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
   }
})
  
  const taskSlice = createSlice({
    name: 'task',
    initialState,
   extraReducers:(builder)=>{
    builder.addCase(createTask.pending,(state)=>{
      state.isLoading=true
    }),
    builder.addCase(createTask.fulfilled,(state,action)=>{
      state.isLoading = false;
      toast.success('Task Created');
    }),
    builder.addCase(createTask.rejected,(state,{payload})=>{
      state.isLoading = false;
      toast.error(payload);
    }),
    builder.addCase(editTask.pending,(state)=>{
      state.isLoading=true
    }),
    builder.addCase(editTask.fulfilled,(state)=>{
      state.isLoading = false;
      toast.success('Task Modified...');
    }),
    builder.addCase(editTask.rejected,(state,{payload})=>{
      state.isLoading = false;
      toast.error(payload);
    })
   },
    reducers:{
      handleChange: (state, { payload: { name, value } }) => {
        state[name] = value;
      },
      clearValues: () => {
        return {
          ...initialState
        };
        return initialState
      },
      setEditTask:(state,{payload})=>{
         return{...state,isEditing:true,...payload}
      }
  
     }
  });
  export const { handleChange,clearValues,setEditTask  } = taskSlice.actions;
  export default taskSlice.reducer;