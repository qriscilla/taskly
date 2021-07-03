import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Title from './Title';
import AccountMenu from './AccountMenu';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

const Navbar = () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const openSignOutMenu = e => setAnchorEl(e.currentTarget);
    const closeSignOutMenu = () => setAnchorEl(null);

    return (
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <Title
            openSignOutMenu={openSignOutMenu} />
          <AccountMenu
            anchorEl={anchorEl}
            closeSignOutMenu={closeSignOutMenu} />
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;