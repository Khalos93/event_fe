function loginValidation(loginValues) {
  const loginErrors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (loginValues.email === '') {
    loginErrors.email = 'email should not be empty';
  } else if (!email_pattern.test(loginValues.email)) {
    loginErrors.email = 'email needs to include "@"';
  } else {
    loginErrors.email = '';
  }

  if (loginValues.password === '') {
    loginErrors.password = 'Password should not be empty';
  } else if (!password_pattern.test(loginValues.password)) {
    loginErrors.password =
      'Password needs to contain at least a capital letter and a number and be at least 8 characters long (symbols not permitted)';
  } else {
    loginErrors.password = '';
  }

  return loginErrors;
}

export default loginValidation;
