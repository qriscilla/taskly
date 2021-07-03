import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { useStyles } from './SharedStyles';
import Logo from './Logo';

export const ResetPassword = () => {
  const styles = useStyles();
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();

    let email = emailRef.current.value;
    
    setError('');
    setMessage('');

    resetPassword(email)
      .then(() => setMessage('Check your inbox for further instructions.'))
      .catch(err => setError(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Logo />
        {error && <Alert severity="error" className={styles.alert}>{error}</Alert>}
        {message && <Alert severity="success" className={styles.alert}>{message}</Alert>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit} >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/planr/sign-up' className={styles.link}>
                Don't have an account? Sign up
              </Link>
            </Grid>
            <Grid item>
              <Link to='/planr/sign-in' className={styles.link}>
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