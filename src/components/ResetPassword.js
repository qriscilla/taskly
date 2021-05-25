import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  alert: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline'
      },
  }
}));

export const ResetPassword = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { resetPassword } = useAuth();

  const handleSubmit = async e => {
      e.preventDefault();

      let email = emailRef.current.value;

      await resetPassword(email)
        .then(() => {
          setError('');
          setMessage('Check your inbox for further instructions.');
        })
        .catch(error => setError(error.message));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
        {message && <Alert severity="success" className={classes.alert}>{message}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/sign-up' className={classes.link}>
                Don't have an account? Sign up
              </Link>
            </Grid>
            <Grid item>
              <Link to='/sign-in' className={classes.link}>
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ResetPassword;