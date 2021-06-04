import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useProjectContext } from '../../contexts';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { database } from '../../firebase';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '600',
        marginBottom: '19px'
    },
    button: {
        padding: '1px',
        margin: '0 5px 0 5px',
    },
    snackbar: {
        position: "fixed",
        bottom: 0,
        paddingBottom: 15,
        right: 0,
        paddingRight: 15
    },
}));

const ProjectHeader = () => {
    const classes = useStyles();
    const { project, projectId, selectProject } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [projectDeletedOpen, setProjectDeletedOpen] = useState(false);
    const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
    const [projectUpdatedSnackbarOpen, setProjectUpdatedSnackbarOpen] = useState(false);
    const taskRef = useRef();
    const dueDateRef = useRef();
    const projectNameRef = useRef();

    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const deleteProject = () => {
        database
            .collection('projects')
            .doc(projectId)
            .delete()
            .then(() => setProjectDeletedOpen(true));

        database
            .collection('tasks')
            .where('projectId', '==', projectId)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));

        setDialogOpen(false);
        selectProject(0);
    };

    const addTask = () => {
        let task = taskRef.current.value;
        let dueDate = dueDateRef.current.value;

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
                setSnackbarOpen(true);
            })
            .catch(err => console.log(err.message));
    };

    const updateProject = e => {
        e.preventDefault();

        let name = projectNameRef.current.value;

        database
            .collection('projects')
            .doc(projectId)
            .update({name})
            .then(() => {
                setEditProjectDialogOpen(false);
                setProjectUpdatedSnackbarOpen(true);
            })
            .catch(err => console.log(err));
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
                    onClick={handleClick} >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted 
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }} >
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(false);
                            setEditProjectDialogOpen(true);
                        }} >
                        Rename
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setAnchorEl(false);
                        setDialogOpen(true);
                    }} >Delete</MenuItem>

                    <Dialog maxWidth='xs' fullWidth={true} open={dialogOpen}>
                        <DialogTitle id="form-dialog-title">Delete project?</DialogTitle>
                        <DialogContent>
                        <DialogContentText style={{color: 'black'}}>
                            Please confirm your action. This will permanently delete the project as well as its containing tasks.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button 
                            size='small' 
                            style={{fontWeight: '600'}} 
                            variant='outlined' 
                            color="secondary"
                            onClick={() => setDialogOpen(false)} >
                            Cancel
                        </Button>
                        <Button 
                            size='small' 
                            style={{fontWeight: '600'}} 
                            variant='contained' 
                            color="secondary"
                            onClick={deleteProject} >
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Menu>
            </span>

            <Dialog maxWidth='xs' fullWidth={true} open={addTaskDialogOpen}>
                <DialogTitle>Add new task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Task'
                        type='text'
                        fullWidth
                        inputRef={taskRef} />
                    <div style={{marginTop: '15px', marginBottom: '-5px', color: 'gray', fontSize: '15px'}}>Due Date</div>
                    <TextField
                        margin='dense'
                        fullWidth
                        type='date'
                        inputRef={dueDateRef} />
                </DialogContent>
                <DialogActions>
                <Button 
                    size='small' 
                    style={{fontWeight: '600'}} 
                    variant='outlined' 
                    color="primary"
                    onClick={() => setAddTaskDialogOpen(false)} >
                    Cancel
                </Button>
                <Button 
                    size='small' 
                    style={{fontWeight: '600'}} 
                    variant='contained' 
                    color="primary"
                    onClick={addTask} >
                    Add
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog maxWidth='xs' fullWidth={true} open={editProjectDialogOpen}>
              <DialogTitle>Edit project</DialogTitle>
              <form onSubmit={updateProject}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin='dense'
                    label='Project name'
                    type='text'
                    defaultValue={project && project.name}
                    fullWidth
                    inputRef={projectNameRef} />
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant='outlined'
                        size='small'
                        style={{fontWeight: '600'}}
                        onClick={() => setEditProjectDialogOpen(false)} 
                        color="primary" >
                        Cancel
                    </Button>
                    <Button 
                        type='submit'
                        variant='contained'
                        size='small'
                        style={{fontWeight: '600'}}
                        color="primary" >
                        Save
                    </Button>
                </DialogActions>
              </form>
            </Dialog>

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                className={classes.snackbar} >
                <Alert 
                    onClose={() => setSnackbarOpen(false)} 
                    variant='outlined' 
                    severity="success"
                    style={{paddingTop: '1px', paddingBottom: '1px'}} >
                    Task was added!
                </Alert>
            </Snackbar>

            <Snackbar 
                open={projectDeletedOpen} 
                autoHideDuration={6000} 
                onClose={() => setProjectDeletedOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                className={classes.snackbar} >
                <Alert 
                    onClose={() => setProjectDeletedOpen(false)} 
                    variant='outlined' 
                    severity="success"
                    style={{paddingTop: '1px', paddingBottom: '1px'}} >
                    Project was deleted!
                </Alert>
            </Snackbar>

            <Snackbar 
                open={projectUpdatedSnackbarOpen} 
                autoHideDuration={6000} 
                onClose={() => setProjectUpdatedSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                className={classes.snackbar} >
                <Alert 
                    onClose={() => setProjectUpdatedSnackbarOpen(false)} 
                    variant='outlined' 
                    severity="success"
                    style={{paddingTop: '1px', paddingBottom: '1px'}} >
                    Project was updated!
                </Alert>
            </Snackbar>
        </Typography>
    );
}

export default ProjectHeader;