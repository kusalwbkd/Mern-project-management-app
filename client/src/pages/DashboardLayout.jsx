import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BigSidebar, Navbar, SmallSidebar } from '../components'

const DashboardLayout = () => {
  const{user,isLoading}=useSelector((store)=>store.user)
  const navigate=useNavigate()

  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar/>
          <BigSidebar/>
          <div>
            <Navbar/>
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`
export default DashboardLayout