import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../../constants';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';

const ProjectMenu = ({ 
    anchorEl, 
    setAnchorEl, 
}) => {
    const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);

    return (
        <>
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

            <EditProject
                editProjectDialogOpen={editProjectDialogOpen}
                setEditProjectDialogOpen={setEditProjectDialogOpen} />

            <DeleteProject 
                deleteProjectDialogOpen={deleteProjectDialogOpen}
                setDeleteProjectDialogOpen={setDeleteProjectDialogOpen} />
        </>
    );
}

export default ProjectMenu;