import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../../constants';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';

const ProjectMenu = ({ anchorEl, setAnchorEl }) => {
    const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);

    const proceedEditProject = () => {
        setAnchorEl(false);
        setEditProjectDialogOpen(true);
    };

    const proceedDeleteProject = () => {
        setAnchorEl(false);
        setDeleteProjectDialogOpen(true);
    };

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
                <MenuItem onClick={proceedEditProject}>
                    Rename
                </MenuItem>
                <MenuItem onClick={proceedDeleteProject}>
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