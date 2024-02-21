function validation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.userName.length === 0) {
    errors.userName = 'username should not be empty';
  } else if (values.userName.length <= 4) {
    errors.userName = 'usurname need to be at least 5 characters long';
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
      'Password needs to contain at least a capital letter and a number and be at least 8 characters long (symbols not permitted)';
  } else {
    errors.password = '';
  }

  if (values.repeatPassword !== values.password) {
    errors.repeatPassword = `Passwords don't match`;
  } else if (values.repeatPassword === '') {
    errors.repeatPassword = 'Repeat password should not be empty';
  } else {
    errors.repeatPassword = '';
  }

  return errors;
}

export default validation;
