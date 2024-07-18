import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import JobInfo from './JobInfo';
import { FcDepartment } from "react-icons/fc";
import { BsListTask } from "react-icons/bs";
import { FaCalendar, FaUser } from 'react-icons/fa';
import moment from 'moment';
import { deleteTask, setEditTask } from '../features/task/TaskSlice';
const Task = ({_id,task,givenTo,taskStatus,taskType,department,createdAt}) => {
  
 const{name,_id:id}=givenTo
 const date = moment(createdAt).format('MMM Do, YYYY'); 
 
 const dispatch = useDispatch();
  return (
    <Wrapper>
    <header>
    <div className='main-icon'>{task.charAt(0)}</div>
      <div className='info'>
      <JobInfo icon={ <BsListTask/>} text={task} />
      <hr/>

       
        <JobInfo icon={<FcDepartment/>} text={department} />

       
        <hr/>
        <JobInfo icon={<FaUser/>} text={givenTo.name} />
      <hr/>
      <JobInfo icon={<FaCalendar/>} text={date} />


  
      </div>
    </header>
    <div className='content'>
      <div className='content-center'>
      <div className={`status ${taskType}`}>{taskType}</div>

        <div className={`status ${taskStatus}`}>{taskStatus}</div>
      </div>
      <footer>
        <div className='actions'>
          <Link
            to='../add-task'
            className='btn edit-btn'
            onClick={() => {
             dispatch(setEditTask({ 
              editTaskId: _id,
              task,
              givenTo,
              taskStatus,
              taskType,
              department



             }))
            }}
          >
            Edit
          </Link>
          <button
            type='button'
            className='btn delete-btn'
            onClick={() => {
              dispatch(deleteTask(_id))
            }}
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </Wrapper>
  )
}

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .accept {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }


  .low {
    background: #5085ef;
    color: #1f07f1;
  }
  .medium {
    background: #b6fac4;
    color: #0bdf0b;
  }
  .urgent {
    color: #ce1212;
    background: #f1a7a7;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Task