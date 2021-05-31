import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useProjectContext } from '../../contexts/ProjectContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../../firebase';
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
    const taskRef = useRef();
    const dueDateRef = useRef();

    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const deleteProject = () => {
        db.collection('projects').doc(projectId).delete();

        setDialogOpen(false);
        selectProject(0);
    };

    const addTask = () => {
        let task = taskRef.current.value;
        let dueDate = dueDateRef.current.value;

        db
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
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted 
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }} >
                    <MenuItem>Rename</MenuItem>
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
        </Typography>
    );
}

export default ProjectHeader;