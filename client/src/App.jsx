
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddTask, Admin, AllStats, DashboardLayout, EditTask, Error, HomeLayout, Landing, Login, Profile, Register, Stats } from './pages';
import { ErrorElement } from './components';
import ProtectedRoute from './pages/ProtectedRoute';
import AllTasks from './pages/AllTasks';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing/>,
      },
      {
        path: 'register',
        element: <Register/>,
       
      },
      {
        path: 'login',
        element: <Login/>,
       
      },
      {
        path: 'dashboard',
        element:[
        <ProtectedRoute>
            <DashboardLayout/>,
        </ProtectedRoute>
        
        ] ,
      
        children: [
          {
          index:true,
            element: <Stats/>,
            errorElement: <ErrorElement/>,
          },
          {
            path: 'add-task',
            element: <AddTask/>,
            errorElement:<ErrorElement/>
           
          },
         
          {
            path: 'all-tasks',
            element: <AllTasks />,
            
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
           
          },
          {
            path: 'admin',
            element: <Admin/>,
          
          },
          {
            path: 'edit-task/:id',
            element: <EditTask/>,
            
          },
          
        ],
      },
    ],
  },
]);

const App = () => {
  return (
  
      <RouterProvider router={router} />
      
  );
};
export default App