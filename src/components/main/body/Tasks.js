import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import { useProjectContext } from '../../../contexts';
import { database } from '../../../firebase';
import TaskMenu from './TaskMenu';
import DeleteDialog from '../extras/DeleteDialog';
import ConfirmSnackbar from '../extras/ConfirmSnackbar';
import TaskDialog from '../extras/TaskDialog';

const useStyles = makeStyles(theme => ({
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
    },
    dueDate: {
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        color: theme.palette.primary.main,
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 10,
        padding: '5px 10px',
        marginRight: 10
    }
}));

const Tasks = () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currTaskId, setCurrTaskId] = useState('');
    const [currTask, setCurrTask] = useState({});
    const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);
    const [deleteTaskSnackbarOpen, setDeleteTaskSnackbarOpen] = useState(false);
    const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
    const [editTaskSnackbarOpen, setEditTaskSnackbarOpen] = useState(false);
    const { tasks } = useProjectContext();

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
        <div>
            <Typography className={styles.tasks}>
                {tasks.map(task =>
                    <div key={task.id} className={styles.task}>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={task.completed}
                                        size='small'
                                        color='primary'
                                        onChange={toggleTaskComplete(task.id)} />
                                } />
                            {task.task}
                        </div>
                        <div>
                            <span className={styles.dueDate}>
                                {task.dueDate}
                            </span>
                            <IconButton
                                className={styles.elipses}
                                onClick={openTaskMenu(task)} >
                                <MoreHorizIcon />
                            </IconButton>                            
                        </div>
                    </div>
                )}
            </Typography>
            <Divider />
            <TaskMenu 
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                setEditTaskDialogOpen={setEditTaskDialogOpen}
                setDeleteTaskDialogOpen={setDeleteTaskDialogOpen} />
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
                actionLabel="Save"
                action={updateTask}
                currTask={currTask} />
            <ConfirmSnackbar
                snackbarOpen={editTaskSnackbarOpen}
                setSnackbarOpen={setEditTaskSnackbarOpen}
                confirmMessage='Task was updated!' />
        </div>
    );
}

export default Tasks;