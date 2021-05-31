import React, { useState } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { db } from '../../firebase';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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

  return (
      <main className={classes.content}>
        <Toolbar />

        <ProjectHeader />
        
        <Typography className={classes.tasks}>
            {tasks.map(task => 
                <span key={task.task} className={classes.task}>
                  <span>
                    <FormControlLabel control={<Checkbox checked={task.completed} size='small' color='primary' />} />
                    {task.task}                    
                  </span>
                  <IconButton 
                    className={classes.elipses}
                    onClick={e => setAnchorEl(e.currentTarget)} >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu 
                    anchorEl={anchorEl}
                    keepMounted 
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }} >
                    <MenuItem>Edit</MenuItem>
                    <MenuItem onClick={() => {
                      setAnchorEl(false);
                      setDeleteTaskDialogOpen(true);
                    }} >Delete</MenuItem>

                    <Dialog maxWidth='xs' fullWidth={true} open={deleteTaskDialogOpen}>
                      <DialogTitle id="form-dialog-title">Delete task?</DialogTitle>
                      <DialogContent>
                      <DialogContentText style={{color: 'black'}}>
                          Please confirm your action. This will permanently delete the task.
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button 
                          size='small' 
                          style={{fontWeight: '600'}} 
                          variant='outlined' 
                          color="secondary"
                          onClick={() => setDeleteTaskDialogOpen(false)} >
                          Cancel
                      </Button>
                      <Button 
                          size='small' 
                          style={{fontWeight: '600'}} 
                          variant='contained' 
                          color="secondary"
                          onClick={deleteTask(task.id)} >
                          Delete
                      </Button>
                      </DialogActions>
                    </Dialog>
                  </Menu>
                </span>
            )}
            <Divider />
        </Typography>
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
      </main>
  );
}

export default Tasks;