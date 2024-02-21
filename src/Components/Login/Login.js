import React, { useState, useRef, useEffect } from 'react';
import './Login.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/events';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8585/login`, {
        email: user,
        password: pwd
      });

      const token = response?.data?.token;

      setAuth({ token });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unathorized');
      } else {
        setErrMsg('Login Failed');
      }

      errRef.current.focus();
    }
  };

  return (
    <section className="login__section">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="login__title">Login</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <label className="login__label" htmlFor="username">
          Email:
        </label>
        <input
          className="input__username"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={e => {
            setUser(e.target.value);
          }}
          value={user}
          required
        />
        <label className="login__label" htmlFor="password">
          Password:
        </label>
        <input
          className="input__password"
          type="password"
          id="password"
          onChange={e => {
            setPwd(e.target.value);
          }}
          value={pwd}
          autoComplete="off"
          required
        />
        <button className="submit__btn">Login</button>
      </form>
      <div className="div__container">
        <p className="message">
          Need an account?
          <br />
          <span>
            <Link className="link__login" to={'/signUp'}>
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default Login;
