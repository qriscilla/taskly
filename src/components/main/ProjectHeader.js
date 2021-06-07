import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteDialog from './dialogs/DeleteDialog';
import TaskDialog from './dialogs/TaskDialog';
import ProjectDialog from './dialogs/ProjectDialog';
import ConfirmSnackbar from './ConfirmSnackbar';
import { useProjectContext } from '../../contexts';
import { database } from '../../firebase';

const useStyles = makeStyles(() => ({
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '600',
        marginBottom: '19px'
    },
    button: {
        padding: '1px',
        margin: '0 5px 0 5px',
    }
}));

const ProjectHeader = () => {
    const classes = useStyles();
    const { project, projectId, selectProject } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
    const [editProjectSnackbarOpen, setEditProjectSnackbarOpen] = useState(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [deleteProjectSnackbarOpen, setDeleteProjectSnackbarOpen] = useState(false);
    const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
    const [addTaskSnackbarOpen, setAddTaskSnackbarOpen] = useState(false);

    const openProjectMenu = e => setAnchorEl(e.currentTarget);
    const closeProjectMenu = () => setAnchorEl(null);

    const updateProject = projectName => {
        database
            .collection('projects')
            .doc(projectId)
            .update({
                name: projectName
            })
            .then(() => {
                setEditProjectDialogOpen(false);
                setEditProjectSnackbarOpen(true);
            })
            .catch(err => console.log(err));
    };
    
    const deleteProject = () => e => {
        database
            .collection('projects')
            .doc(projectId)
            .delete()
            .then(() => setDeleteProjectSnackbarOpen(true));

        database
            .collection('tasks')
            .where('projectId', '==', projectId)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));

        setDeleteProjectDialogOpen(false);
        selectProject(0);
    };

    const addTask = (task, dueDate) => {
        database
            .collection('tasks')
            .add({
                task: task,
                completed: false,
                projectId: projectId,
                dueDate: dueDate
            })
            .then(() => {
                setAddTaskDialogOpen(false);
                setAddTaskSnackbarOpen(true);
            })
            .catch(err => console.log(err.message));
    };

    return (
        <Typography variant='h6' className={classes.projectHeader}>
            {project && project.name}
            <span>
                <IconButton 
                    className={classes.button} 
                    color='primary'
                    onClick={() => setAddTaskDialogOpen(true)} >
                    <AddIcon />
                </IconButton>
                <IconButton 
                    className={classes.button} 
                    color='primary'
                    onClick={openProjectMenu} >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted 
                    open={Boolean(anchorEl)}
                    onClose={closeProjectMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }} >
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
            </span>
            <ProjectDialog
                dialogOpen={editProjectDialogOpen}
                setDialogOpen={setEditProjectDialogOpen}
                title="Edit project"
                actionFunc={updateProject}
                actionType="Save" />
            <ConfirmSnackbar
                snackbarOpen={editProjectSnackbarOpen}
                setSnackbarOpen={setEditProjectSnackbarOpen}
                confirmMessage="Project was updated!" />
            <DeleteDialog 
                itemType="project"
                dialogOpen={deleteProjectDialogOpen}
                setDialogOpen={setDeleteProjectDialogOpen}
                deleteFunc={deleteProject} />
            <ConfirmSnackbar
                snackbarOpen={deleteProjectSnackbarOpen}
                setSnackbarOpen={setDeleteProjectSnackbarOpen}
                confirmMessage="Project was deleted!" />
            <TaskDialog
                dialogOpen={addTaskDialogOpen}
                setDialogOpen={setAddTaskDialogOpen}
                title='Add new task'
                actionType="Add"
                actionFunc={addTask}
                currTask={null} />
            <ConfirmSnackbar
                snackbarOpen={addTaskSnackbarOpen}
                setSnackbarOpen={setAddTaskSnackbarOpen}
                confirmMessage="Task was added!" />
        </Typography>
    );
}

export default ProjectHeader;