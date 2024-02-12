import React from 'react';
import { useState } from 'react';
import '../utils/formValidation';
import validation from '../utils/formValidation';
import axios from 'axios';

function SignUp() {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [errors, setErrors] = useState({});

  function handleInput(e) {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(values));
    console.log(values);
    console.log(errors);
    if (
      errors.userName === '' &&
      errors.email === '' &&
      errors.password === '' &&
      errors.repeatPassword === ''
    ) {
      const query = {
        name: values.userName,
        email: values.email,
        password: values.password
      };
      console.log(query);
      axios
        .post(`http://localhost:8080/signup`, query)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Enter your username"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.usurName && <span>{errors.usurName}</span>}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="repeatPassword">Confirm password</label>
          <input
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            placeholder="retype your password"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.repeatPassword && <span>{errors.repeatPassword}</span>}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SignUp;
