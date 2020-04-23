const validationErrorMessage = {
  missing: 'Field required',
  emailFormat: 'Must be valid email address',
  passwordMismatch: 'Passwords must be the same',
};

const isEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  return false;
};

export function isEmpty(string) {
  if (!string || string.trim() === '') return true;
  return false;
}

export function validateLoginData(data) {
  const errors = {};
  if (isEmpty(data.email)) errors.email = validationErrorMessage.missing;
  if (isEmpty(data.password)) errors.password = validationErrorMessage.missing;
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

export function validateSignUpData(data) {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = validationErrorMessage.missing;
  } else if (!isEmail(data.email)) {
    errors.email = validationErrorMessage.emailFormat;
  }

  if (isEmpty(data.username)) errors.username = validationErrorMessage.missing;

  if (isEmpty(data.password)) {
    errors.password = validationErrorMessage.missing;
  } else if (data.password !== data.passwordConfirm) {
    errors.password = validationErrorMessage.passwordMismatch;
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
