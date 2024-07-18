import React from 'react'
import logo from '../assets/images/Logo.jpeg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import { Logo } from '../components';
import { Link } from 'react-router-dom';
    const Landing = () => {
      return (
        <Wrapper>
        <main>
          <nav>
            
        <Logo/>
           
          </nav>
          <div className='container page'>
            {/* info */}
            <div className='info'>
              <h1>
                 <span>Tasks</span> app
              </h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quia pariatur, sed explicabo dolorem fugit voluptates provident. Neque facilis rem quod fuga perspiciatis ipsum praesentium obcaecati, inventore aperiam voluptatibus magnam quis libero quaerat, unde provident, deserunt aliquam itaque magni. Optio, quisquam qui. Distinctio unde explicabo repellat quibusdam commodi accusantium dolorum.</p>
              <Link to={'/register'} className='btn btn-hero'>Login</Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
          </div>
        </main>
        </Wrapper>
      );
    };
    
  
    const Wrapper = styled.main`
    nav {
      width: var(--fluid-width);
      max-width: var(--max-width);
      margin: 0 auto;
      height: var(--nav-height);
      display: flex;
      align-items: center;
    }
    .page {
      min-height: calc(100vh - var(--nav-height));
      display: grid;
      align-items: center;
      margin-top: -3rem;
    }
    h1 {
      font-weight: 700;
      span {
        color: var(--primary-500);
      }
    }
    h3 {
      font-weight: 700;
      span {
        color: var(--primary-500);
      }
    }
    p {
      color: var(--grey-600);
    }
    .main-img {
      display: none;
    }
    @media (min-width: 992px) {
      .page {
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
      }
      .main-img {
        display: block;
      }
    }
  `
  export default Landing;