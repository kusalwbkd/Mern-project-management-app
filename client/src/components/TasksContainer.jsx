import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import styled from 'styled-components';
import { getAllTasks } from '../features/allTasks/AllTasks';
import Loading from './Loading';

const TasksContainer = () => {
 
    const { filterd_tasks, isLoading } = useSelector((store) => store.allTasks);

    const dispatch = useDispatch();
  
    useEffect(()=>{
   dispatch(getAllTasks())
    },[])
    if (isLoading) {
      return (
       
         <Loading center/>
       
      );
    }
  
    if (filterd_tasks.length === 0) {
      return (
        <Wrapper>
          <h2>No tasks to display...</h2>
        </Wrapper>
      );
    }
  
    return (
      <Wrapper>
        <h5>tasks info</h5>
        <div className='jobs'>
          {filterd_tasks.map((task) => {
            return <Task key={task._id} {...task} />;
          })}
        </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`
export default TasksContainer