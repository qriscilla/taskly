import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ProjectHeader from './ProjectHeader';
import ConfirmSnackbar from './extras/ConfirmSnackbar';
import DeleteDialog from './extras/DeleteDialog';
import TaskDialog from './extras/TaskDialog';
import { useProjectContext } from '../../contexts';
import { database } from '../../firebase';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tasks: {
      display: 'flex',
      flexDirection: 'column'
  },
  task: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  elipses: {
    color: 'black',
    width: 10,
    height: 10,
    marginRight: 6
  }
}));

const Tasks = () => {
  const styles = useStyles();
  const { tasks } = useProjectContext();
  const [currTaskId, setCurrTaskId] = useState('');
  const [currTask, setCurrTask] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);
  const [deleteTaskSnackbarOpen, setDeleteTaskSnackbarOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [editTaskSnackbarOpen, setEditTaskSnackbarOpen] = useState(false);

  const toggleTaskComplete = taskId => e => {    
    database
      .collection('tasks')
      .doc(taskId)
      .update({ completed: e.target.checked });
  };

  const openTaskMenu = task => e => {
    setCurrTaskId(task.id);
    setCurrTask(task);
    setAnchorEl(e.currentTarget);
  };

  const deleteTask = () => e => {
    database
      .collection('tasks')
      .doc(currTaskId)
      .delete()
      .then(() => {
        setDeleteTaskDialogOpen(false);
        setDeleteTaskSnackbarOpen(true);
      })
  };

  const updateTask = (task, dueDate) => {
    database  
      .collection('tasks')
      .doc(currTaskId)
      .update({
        task,
        dueDate
      })
      .then(() => {
        setEditTaskDialogOpen(false);
        setEditTaskSnackbarOpen(true);
      });
  };

  return (
    <main className={styles.content}>
      <Toolbar />
      <ProjectHeader />
      <Typography className={styles.tasks}>
          {tasks.map(task => 
              <span key={task.id} className={styles.task}>
                <span>
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={task.completed} 
                        size='small' 
                        color='primary'
                        onChange={toggleTaskComplete(task.id)} />
                    } />
                  {task.task}                    
                </span>
                <IconButton 
                  className={styles.elipses}
                  onClick={openTaskMenu(task)} >
                  <MoreHorizIcon />
                </IconButton>
              </span>
          )}
      </Typography>
      <Divider />
      <Menu 
        anchorEl={anchorEl}
        keepMounted 
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }} >
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
      <DeleteDialog 
        itemType="task"
        dialogOpen={deleteTaskDialogOpen}
        setDialogOpen={setDeleteTaskDialogOpen}
        deleteFunc={deleteTask} />
      <ConfirmSnackbar
        snackbarOpen={deleteTaskSnackbarOpen}
        setSnackbarOpen={setDeleteTaskSnackbarOpen}
        confirmMessage='Task was deleted!' />
      <TaskDialog
        dialogOpen={editTaskDialogOpen}
        setDialogOpen={setEditTaskDialogOpen}
        title="Edit task"
        actionType="Save"
        actionFunc={updateTask}
        currTask={currTask} />
      <ConfirmSnackbar
        snackbarOpen={editTaskSnackbarOpen}
        setSnackbarOpen={setEditTaskSnackbarOpen}
        confirmMessage='Task was updated!' />
    </main>
  );
}

export default Tasks;