import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/UserSlice';
import { useNavigate } from 'react-router-dom';


const initialState = {
  name: '',
  email: '',
  password: '',
  lastName:'',
  department:'',
  isMember:false
 
};


const Register = () => {
  const [values, setValues] = useState(initialState);
  const{user,isLoading}=useSelector((store)=>store.user)
  const navigate=useNavigate()
const dispatch=useDispatch()
  const handleChange = (e) => {
   const name=e.target.name 
   const value=e.target.value

   setValues({...values,[name]:value})
  };

  const onSubmit = (e) => {
    const { name, email, password, isMember,lastName,department } = values;
    e.preventDefault();
    if (!email || !password  ) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password,department,lastName }));
   
  };

  const toggleMember=()=>{
    setValues({...values,isMember:!values.isMember})
  }

  useEffect(()=>{
    if(user){
     
      setTimeout(()=>{
        navigate('../dashboard')
        },2000)
    }

  },[user])
  return (
    <Wrapper className='full-page'>
    <form className='form' onSubmit={onSubmit}>
      <Logo/>
      <h3>{values.isMember ? 'Login' : 'Register'}</h3>
    
      {!values.isMember && (
        <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
      )}
     
      <FormRow
        type='email'
        name='email'
        value={values.email}
        handleChange={handleChange}
      />
  <FormRow
        type='password'
        name='password'
        value={values.password}
        handleChange={handleChange}
      />
     
     {!values.isMember &&  <FormRow
        type='text'
        name='lastName'
        value={values.lastName}
        handleChange={handleChange}
      />}
      
      {!values.isMember && <FormRow
        type='text'
        name='department'
        value={values.department}
        handleChange={handleChange}
      />
     }
    
    
      <button type='submit' className='btn btn-block' disabled={isLoading} >
      submit
      </button>
    
    <p>
      Login details 

      email : admin@gmail.com 
      password: admin123
    </p>
      <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
    </form>
  </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`
export default Register