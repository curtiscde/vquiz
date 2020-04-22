const isEmpty = (string) => {
  if (string.trim() === '') return true;
  return false;
};

export default function validateLoginData(data) {
  const errors = {};
  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}
