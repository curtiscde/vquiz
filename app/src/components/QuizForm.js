import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progess: {
    position: 'absolute',
  },
}));

const QuizForm = ({
  fields,
  onChange,
  onSubmit,
  loading = false,
}) => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        autoComplete="title"
        name="title"
        autoFocus
        value={fields.title}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="date"
        label="Date"
        autoComplete="date"
        name="date"
        value={fields.date}
        onChange={onChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
        disabled={loading || !fields.title || !fields.date}
      >
        Submit
        {loading && <CircularProgress size={30} className={classes.progess} />}
      </Button>
    </form>
  );
};

QuizForm.propTypes = {
  fields: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default QuizForm;
