import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DoneOutline from '@material-ui/icons/DoneOutline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from '../../contexts';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    marginLeft: 15
  },
  signOutMenu: {
    marginRight: '-15px'
  }
}));

const Navbar = () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { signOut } = useAuth();

    const handleSignOut = () => signOut().catch(err => console.log(err.message));
    const openSignOutMenu = e => setAnchorEl(e.currentTarget);
    const closeSignOutMenu = () => setAnchorEl(null);

    return (
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <DoneOutline />
          <Typography variant="h6" className={styles.title}>
            taskly
          </Typography>
          <Button color="inherit" onClick={openSignOutMenu} className={styles.signOutMenu}>
            <AccountCircle />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeSignOutMenu}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }} >
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;