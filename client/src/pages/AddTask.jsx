import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { FormRow, FormRowSelect } from '../components';
import { TASK_STATUS, TASK_TYPE } from '../../../utils/constants';
import { clearValues, createTask, editTask, handleChange } from '../features/task/TaskSlice';
import { getAllUsers } from '../features/user/UserSlice';

const AddTask = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUsers())
    },[]) 

  const{isLoading,
    task,
    department,
    givenTo,
    taskTypeOptions,
    taskType,
    statusOptions,
    taskStatus,
    isEditing,
    editTaskId}=useSelector((store) => store.task);

    const {  users } = useSelector((store) => store.user);
   
    const{_id:id,name}=givenTo
   
const userNames=users.map((user)=>user.name)
   
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!department || !task ||!givenTo) {
        toast.error('Please Fill Out All Fields');
        return;
      }
      if(isEditing){
          dispatch(editTask({
            taskId:editTaskId,
            task:{task,department,givenTo,taskStatus,taskType}
          }))
          return
      }

      dispatch(createTask({ task, givenTo, department, taskStatus, taskType }));
    };
    const handleTaskInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch(handleChange({name,value}))
    };


   /* */
  return (
    <Wrapper>
    <form className='form'>
      <h3>{isEditing ? 'edit task' : 'add task'}</h3>

      <div className='form-center'>
       
        <FormRow
          type='text'
          name='task'
          value={task}
          handleChange={handleTaskInput}
        />
       
{/*         <FormRow
          type='text'
           labelText='Given To'
          name='givenTo'
          value={givenTo}
          handleChange={handleTaskInput}
        />
        */}
        <FormRow
          type='text'
          name='department'
          value={department}
          handleChange={handleTaskInput}
        />

       {/*  <FormRowSelect
         name='givenTo'
         value={givenTo}
         handleChange={handleTaskInput}
         list={users}
        
        /> */}
  <FormRowSelect
         name='givenTo'
         value={givenTo}
         handleChange={handleTaskInput}
         list={users}
        
        />  



 
           <FormRowSelect
         name='taskStatus'
         value={taskStatus}
         handleChange={handleTaskInput}
         list={Object.values(TASK_STATUS)}
        
        />  

         <FormRowSelect
         name='taskType'
         value={taskType}
         handleChange={handleTaskInput}
         list={Object.values(TASK_TYPE)}
        
        />
       
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-block clear-btn'
            onClick={() => dispatch(clearValues())}
          >
            clear
          </button>
          <button
            type='submit'
            className='btn btn-block submit-btn'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
        </div>
      </div>
    </form>
  </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`
export default AddTask