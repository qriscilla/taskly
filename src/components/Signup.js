import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    alert: {
        width: '100%',
        marginTop: theme.spacing(2)
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

const Signup = () => {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let passwordConfirm = passwordConfirmRef.current.value;

        if (password !== passwordConfirm) return setError('Passwords do not match.');

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            history.push('/');
        } catch {
            setError('Failed to create an account.');
        }

        setLoading(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Logo />
                {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                inputRef={emailRef}
                                autoComplete="email"
                                autoFocus />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputRef={passwordRef}
                                autoComplete="current-password" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirm"
                                inputRef={passwordConfirmRef}
                                autoComplete="current-password" />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit} >
                        Sign up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link to='/sign-in' className={classes.link}>
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Signup;