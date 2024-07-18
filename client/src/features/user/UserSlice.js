import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../utils/axios';
import { toast } from 'react-toastify';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState={
    isLoading:false,
    user:getUserFromLocalStorage(),
    isSidebarOpen: false,
    users:[]
}



export const registerUser=createAsyncThunk('user/registerUser',async(user,thunkAPI)=>{
 try {
    const response=await customFetch.post('auth/register',user)
  
   return response.data
 } catch (error) {
    
   
    return thunkAPI.rejectWithValue(error?.response?.data?.msg)
 }
})


export const loginUser=createAsyncThunk('user/loginUser',async(user,thunkAPI)=>{

    try {
        const response=await customFetch.post('auth/login',user)
 
    return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.msg)

    }
    
   })


export const updateUser=createAsyncThunk('user/updateUser',async(user,thunkAPI)=>{
    try {
        const response=await customFetch.patch('users/update-user',user)
 
    return response.data
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
          }
        return thunkAPI.rejectWithValue(error?.response?.data?.msg)

    }
    
   })

export const getAllUsers=createAsyncThunk('users/getAllUsers',async(_,thunkAPI)=>{
    try {
      const response=  await customFetch.get('/users/get-all-users')
      return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.msg)

    }
})

   const userSlice=createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=>{
       builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(registerUser.fulfilled,(state,{payload})=>{
            state.isLoading=false
            const {user}=payload

            state.isLoading=false
            state.user=user 
            addUserToLocalStorage(user)
            toast.success(`Welcome  ${user.name}`)
           
        }),
        builder.addCase(registerUser.rejected,(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        }),
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(loginUser.fulfilled,(state,{payload})=>{
            
            const {user}=payload

            state.isLoading=false
            state.user=user 
            addUserToLocalStorage(user)
            toast.success(`Welcome back ${user.name}`)
        })
        builder.addCase(loginUser.rejected,(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        }),
        builder.addCase(updateUser.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(updateUser.fulfilled,(state,{payload})=>{
            const {user}=payload

            state.isLoading=false
            state.user=user 
            addUserToLocalStorage(user)
            toast.info('profile updated')
        }),
        builder.addCase(updateUser.rejected,(state,{payload})=>{
            state.isLoading=false
           
            toast.error(payload)
        }),
        builder.addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true

        }),
        builder.addCase(getAllUsers.fulfilled,(state,{payload})=>{
            state.isLoading=false
            state.users=payload.users

        }),
        builder.addCase(getAllUsers.rejected,(state,{payload})=>{
            state.isLoading=true
            toast.error(payload);

        })
    },
    reducers:{
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
          },
          logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            toast.success('Logout Successful!');
            removeUserFromLocalStorage();
          },
    }

    

    
    })

    
export const { toggleSidebar,logoutUser } = userSlice.actions
export default userSlice.reducer;