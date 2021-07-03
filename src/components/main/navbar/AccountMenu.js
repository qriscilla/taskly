import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../constants';
import { useAuthContext } from '../../../contexts';

const AccountMenu = ({ anchorEl, closeSignOutMenu }) => {
    const { signOut } = useAuthContext();

    const handleSignOut = () => signOut().catch(err => console.log(err.message));

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