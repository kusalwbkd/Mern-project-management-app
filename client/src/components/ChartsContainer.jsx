import React, { useState } from 'react';



import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChart';
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyTasks: data } = useSelector((store) => store.allTasks);
  return (
    <Wrapper>
      <h4>Monthly Tasks</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;




const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`

