import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Wrapper>
    <h3>
    <span>Tasks-App</span>
    </h3>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    
    h3{
      font-weight: 700;
      span {
        color: var(--primary-500);
      }
    }


`

export default Logo