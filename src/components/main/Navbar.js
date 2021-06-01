import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneOutline from '@material-ui/icons/DoneOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
      fontWeight: '600'
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { signout } = useAuth();

    const handleSignOut = () => signout().catch(error => console.log(error.message));

    const handleClick = (event) => setAnchorEl(event.currentTarget);
  
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <DoneOutline />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                planr.
            </Typography>
            <Button color="inherit" onClick={handleClick} style={{marginRight: '-15px'}}>
                <AccountCircle />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }} >
                <MenuItem onClick={handleClose}>Account</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;