import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../constants';

const AccountMenu = ({ 
    anchorEl,
    closeSignOutMenu,
    handleSignOut
}) => {
    return (
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeSignOutMenu}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin} >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    );
}

export default AccountMenu;