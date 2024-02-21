import React from 'react';
import './SignUp.scss';
import { useState } from 'react';
import '../utils/formValidation';
import validation from '../utils/formValidation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';

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

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(values));

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

      axios
        .post(`http://localhost:8585/signup`, query)
        .then(res => {
          console.log(res);
          e.target.reset();
          navigate(from, { replace: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  return (
    <div className="container">
      <h2 className="title">Register</h2>
      <form className="signUp--form" action="" onSubmit={handleSubmit}>
        <div className="input__container">
          <label className="form__label" htmlFor="userName">
            Username:
          </label>
          <input
            className="form__input"
            id="userName"
            name="userName"
            type="text"
            placeholder="Enter your username"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.userName && (
            <span className="form__error">{errors.userName}</span>
          )}
        </div>
        <div className="input__container">
          <label className="form__label" htmlFor="email">
            email
          </label>
          <input
            className="form__input"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
        </div>
        <div className="input__container">
          <label className="form__label" htmlFor="password">
            password
          </label>
          <input
            className="form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.password && (
            <span className="form__error">{errors.password}</span>
          )}
        </div>
        <div className="input__container">
          <label className="form__label" htmlFor="repeatPassword">
            Confirm password
          </label>
          <input
            className="form__input"
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            placeholder="retype your password"
            autoComplete="off"
            onChange={handleInput}
          />
          {errors.repeatPassword && (
            <span className="form__error">{errors.repeatPassword}</span>
          )}
        </div>
        <button className="submit__btn" type="submit">
          submit
        </button>
      </form>
      <p className="message">Already have an account?</p>
      <Link className="link__login" to={'/login'}>
        login
      </Link>
    </div>
  );
}

export default SignUp;
