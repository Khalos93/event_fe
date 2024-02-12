function validation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.userName === '') {
    errors.userName = 'username should not be empty';
  } else {
    errors.userName = '';
  }

  if (values.email === '') {
    errors.email = 'email should not be empty';
  } else if (!email_pattern.test(values.email)) {
    errors.email = 'email needs to include "@"';
  } else {
    errors.email = '';
  }

  if (values.password === '') {
    errors.password = 'Password should not be empty';
  } else if (!password_pattern.test(values.password)) {
    errors.password =
      'Password need at least a capital letter and a number and be at least 8 character long (sign not permitted)';
  } else {
    errors.password = '';
  }

  if (values.password[0] !== values.repeatPassword[0]) {
    errors.repeatPassword = `Passwords don't match`;
  } else {
    errors.repeatPassword = '';
  }

  return errors;
}

export default validation;
