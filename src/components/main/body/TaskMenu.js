import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../constants';

const TaskMenu = ({ 
    anchorEl, 
    setAnchorEl,
    setEditTaskDialogOpen,
    setDeleteTaskDialogOpen
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
                setEditTaskDialogOpen(true);
            }} >
                Edit
            </MenuItem>
            <MenuItem onClick={() => {
                setAnchorEl(false);
                setDeleteTaskDialogOpen(true);
            }} >
                Delete
            </MenuItem>
        </Menu>
    );
}

export default TaskMenu;