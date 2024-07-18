import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/UserSlice';
import TaskSlice from './features/task/TaskSlice';
import AllTasks from './features/allTasks/AllTasks';
export const store = configureStore({
  reducer: {
    user: userSlice,
    task:TaskSlice,
    allTasks:AllTasks
  },
});