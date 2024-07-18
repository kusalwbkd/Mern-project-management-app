import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import styled from 'styled-components'
import { clearFilterValues, updateFilters } from '../features/allTasks/AllTasks';
import { getAllUsers } from '../features/user/UserSlice';




const SearchContainer = () => {

  const { isLoading, search, searchStatus, searchType, sort, sortOptions,taskGivenTo } =useSelector((store) => store.allTasks);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUsers())
    },[]) 

  const initialState = {
    search,
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    taskGivenTo:'all',
    
  
   
  };
  
  const [values, setValues] = useState(initialState);
  const {users} = useSelector((store) => store.user);
  
  const givenUsers=users.filter((user)=>user.name !=='Admin')
  
  const { taskTypeOptions, statusOptions } = useSelector((store) => store.task);
  
  const handleSearch = (e) => {
    const name=e.target.name 
    const value=e.target.value
 
    const newValues=({...values,[name]:value})
 setValues(newValues)
    dispatch(updateFilters({values:newValues}))
  };
  const clearFilters = (e) => {
 e.preventDefault()
 setValues(initialState)
 window.location.reload()
   dispatch(clearFilterValues())
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='search'
            value={values.search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={values.searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={values.searchType}
            handleChange={handleSearch}
            list={['all', ...taskTypeOptions]}
          />

           <FormRowSelect
            labelText='Task Given to'
            name='taskGivenTo'
            value={values.taskGivenTo}
            handleChange={handleSearch}
            list={['all',...givenUsers]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={values.sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={clearFilters}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default SearchContainer