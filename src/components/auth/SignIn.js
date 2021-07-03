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

export const SignIn = () => {
  const styles = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const { signIn } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    setError('');

    signIn(email, password).catch(err => setError(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Logo />
        {error && <Alert severity="error" className={styles.alert}>{error}</Alert>}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            autoComplete="current-password" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit} >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/planr/reset-password' className={styles.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/planr/sign-up' className={styles.link}>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;