import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DoneOutline from '@material-ui/icons/DoneOutline';

const useStyles = makeStyles((theme) => ({
    logo: {
        color: theme.palette.primary.main,
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const Logo = () => {
    const classes = useStyles();

    return (
        <Typography variant='h5' className={classes.logo}>
            <DoneOutline fontSize='large' /> taskly
        </Typography>
    );
};

export default Logo;