import React, { useEffect } from 'react'
import { getStat } from '../features/allTasks/AllTasks'
import { useDispatch, useSelector } from 'react-redux';
import { ChartsContainer, Loading, StatsContainer } from '../components';

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyTasks } = useSelector(
    (store) => store.allTasks
  );

  useEffect(()=>{
    dispatch(getStat())
     },[])

     if (isLoading) {
      return <Loading center />;
    }
  return (
    <>
    <StatsContainer />
    {monthlyTasks.length > 0 && <ChartsContainer />}
  </>
  )
}

export default Stats