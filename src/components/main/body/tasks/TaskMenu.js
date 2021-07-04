import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { anchorOrigin, transformOrigin } from '../../../../constants';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const TaskMenu = ({ anchorEl, setAnchorEl, currTask }) => {
    const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
    const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);

    const proceedEditTask = () => {
        setAnchorEl(false);
        setEditTaskDialogOpen(true);
    };

    const proceedDeleteTask = () => {
        setAnchorEl(false);
        setDeleteTaskDialogOpen(true);
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
                <MenuItem onClick={proceedEditTask} >
                    Edit
                </MenuItem>
                <MenuItem onClick={proceedDeleteTask} >
                    Delete
                </MenuItem>
            </Menu>

            <EditTask
                editTaskDialogOpen={editTaskDialogOpen}
                setEditTaskDialogOpen={setEditTaskDialogOpen}
                currTask={currTask} />

            <DeleteTask
                deleteTaskDialogOpen={deleteTaskDialogOpen}
                setDeleteTaskDialogOpen={setDeleteTaskDialogOpen}
                currTask={currTask} />
        </>
    );
}

export default TaskMenu;