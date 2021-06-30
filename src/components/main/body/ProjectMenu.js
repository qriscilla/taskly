import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../constants';

const ProjectMenu = ({ 
    anchorEl, 
    setAnchorEl, 
    setEditProjectDialogOpen, 
    setDeleteProjectDialogOpen 
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            getContentAnchorEl={null}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin} >
            <MenuItem onClick={() => {
                setAnchorEl(false);
                setEditProjectDialogOpen(true);
            }} >
                Rename
            </MenuItem>
            <MenuItem onClick={() => {
                setAnchorEl(false);
                setDeleteProjectDialogOpen(true);
            }} >
                Delete
            </MenuItem>
        </Menu>
    );
}

export default ProjectMenu;