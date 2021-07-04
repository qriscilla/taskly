import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { database } from '../../../../firebase';
import { useProjectContext } from '../../../../contexts';
import TaskDialog from '../../extras/TaskDialog';
import ConfirmSnackbar from '../../extras/ConfirmSnackbar';

const useStyles = makeStyles(() => ({
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 600,
        marginBottom: 19
    },
    button: {
        padding: 1,
        margin: '0 5px',
    }
}));

const AddTask = () => {
    const styles = useStyles();
    const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
    const [addTaskSnackbarOpen, setAddTaskSnackbarOpen] = useState(false);
    const { projectId } = useProjectContext();

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
        <>
            <IconButton 
                className={styles.button} 
                color='primary'
                onClick={() => setAddTaskDialogOpen(true)} >
                <AddIcon />
            </IconButton>  
            <TaskDialog
                dialogOpen={addTaskDialogOpen}
                setDialogOpen={setAddTaskDialogOpen}
                title='Add new task'
                actionLabel="Add"
                action={addTask}
                currTask={null} />
            <ConfirmSnackbar
                snackbarOpen={addTaskSnackbarOpen}
                setSnackbarOpen={setAddTaskSnackbarOpen}
                confirmMessage="Task was added!" />
        </>
    );
}

export default AddTask;