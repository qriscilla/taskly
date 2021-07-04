import React, { useState } from 'react';
import TaskDialog from '../../extras/TaskDialog';
import ConfirmSnackbar from '../../extras/ConfirmSnackbar';
import { database } from '../../../../firebase';

const EditTask = ({
    editTaskDialogOpen,
    setEditTaskDialogOpen,
    currTask
}) => {
    const [editTaskSnackbarOpen, setEditTaskSnackbarOpen] = useState(false);

    const updateTask = (task, dueDate) => {
        database  
          .collection('tasks')
          .doc(currTask.id)
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
        <>
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
        </>
    );
}

export default EditTask;