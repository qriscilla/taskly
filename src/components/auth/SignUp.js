import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Logo from './Logo';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../../contexts';
import { database } from '../../firebase';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    alert: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        },
    }
}));

const SignUp = () => {
    const styles = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const { signup } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();

        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let passwordConfirm = passwordConfirmRef.current.value;

        if (password !== passwordConfirm) return setError('Passwords do not match.');

        setError('');

        signup(email, password)
            .then(() => database.collection('users').add({email}))
            .catch(err => setError(err.message));
    };

    return (
        <Container component='main' maxWidth='xs'>
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
                        inputRef={emailRef}
                        autoComplete="email"
                        autoFocus />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        inputRef={passwordRef} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password Confirmation"
                        type="password"
                        inputRef={passwordConfirmRef} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit} >
                        Sign up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/sign-in' className={styles.link}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;