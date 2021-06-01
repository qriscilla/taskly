import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { useProjectContext } from '../../contexts/ProjectContext';
import ProjectHeader from './ProjectHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { db } from '../../firebase';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteTaskDialog from './DeleteTaskDialog';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: '600',
      marginBottom: '19px'
  },
  tasks: {
      display: 'flex',
      flexDirection: 'column'
  },
  task: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
      padding: '1px',
      margin: '0 5px 0 5px',
  },
  elipses: {
    color: 'black',
    width: 10,
    height: 10,
    marginRight: '6px'
  },
  snackbar: {
    position: "fixed",
    bottom: 0,
    paddingBottom: 15,
    right: 0,
    paddingRight: 15
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const { tasks } = useProjectContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currTaskId, setCurrTaskId] = useState('');
  const [currTask, setCurrTask] = useState({});
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const taskRef = useRef();
  const dueDateRef = useRef();
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);

  const deleteTask = taskId => e => {
    db
      .collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => {
        setDeleteTaskDialogOpen(false);
        setSnackbarOpen(true);
      })
  };

  const handleChange = taskId => event => {
    db
      .collection('tasks')
      .doc(taskId)
      .update({
        completed: event.target.checked
      });
  };

  const updateTask = e => {
    e.preventDefault();

    let task = taskRef.current.value;
    let dueDate = dueDateRef.current.value;

    db  
      .collection('tasks')
      .doc(currTaskId)
      .update({
        task,
        dueDate
      })
      .then(() => {
        setEditTaskDialogOpen(false);
        setSnackbarOpen2(true);
      });
  };

  return (
      <main className={classes.content}>
        <Toolbar />

        <ProjectHeader />
        
        <Typography className={classes.tasks}>
            {tasks.map(task => 
                <span key={task.task} className={classes.task}>
                  <span>
                    <FormControlLabel 
                      control={
                        <Checkbox 
                          checked={task.completed} 
                          size='small' 
                          color='primary'
                          onChange={handleChange(task.id)} />
                      } />
                    {task.task}                    
                  </span>
                  <IconButton 
                    className={classes.elipses}
                    onClick={e => {
                      setCurrTaskId(task.id);
                      setCurrTask(task);
                      setAnchorEl(e.currentTarget);
                    }} >
                    <MoreHorizIcon />
                  </IconButton>
                </span>
            )}
        </Typography>
        <Divider />
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
            Task was deleted!
          </Alert>
        </Snackbar>
        
        <Snackbar 
          open={snackbarOpen2} 
          autoHideDuration={6000} 
          onClose={() => setSnackbarOpen2(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          className={classes.snackbar} >
          <Alert 
            onClose={() => setSnackbarOpen2(false)} 
            variant='outlined' 
            severity="success"
            style={{paddingTop: '1px', paddingBottom: '1px'}} >
            Task was updated!
          </Alert>
        </Snackbar>

        <Menu 
          anchorEl={anchorEl}
          keepMounted 
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }} >
          <MenuItem
            onClick={() => {
              setAnchorEl(false);
              setEditTaskDialogOpen(true);
            }} >
            Edit
          </MenuItem>
            <Dialog maxWidth='xs' fullWidth={true} open={editTaskDialogOpen}>
              <DialogTitle>Edit task</DialogTitle>
              <form onSubmit={updateTask}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin='dense'
                    label='Task'
                    type='text'
                    defaultValue={currTask.task}
                    fullWidth
                    inputRef={taskRef} />
                  <div style={{marginTop: '15px', marginBottom: '-5px', color: 'gray', fontSize: '15px'}}>Due Date</div>
                  <TextField
                      margin='dense'
                      fullWidth
                      type='date'
                      defaultValue={currTask.dueDate}
                      inputRef={dueDateRef} />
                </DialogContent>
                  <DialogActions>
                    <Button 
                      variant='outlined'
                      size='small'
                      style={{fontWeight: '600'}}
                      onClick={() => setEditTaskDialogOpen(false)} 
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
          <MenuItem onClick={() => {
            setAnchorEl(false);
            setDeleteTaskDialogOpen(true);
          }} >Delete</MenuItem>
            <DeleteTaskDialog 
              deleteTaskDialogOpen={deleteTaskDialogOpen}
              setDeleteTaskDialogOpen={setDeleteTaskDialogOpen}
              deleteTask={deleteTask}
              taskId={currTaskId} />
        </Menu>
      </main>
  );
}

export default Tasks;