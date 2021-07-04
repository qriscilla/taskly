import React, { useState } from 'react';
import DeleteDialog from '../../extras/DeleteDialog';
import ConfirmSnackbar from '../../extras/ConfirmSnackbar';
import { database } from '../../../../firebase';

const DeleteTask = ({
    deleteTaskDialogOpen,
    setDeleteTaskDialogOpen,
    currTask
}) => {
    const [deleteTaskSnackbarOpen, setDeleteTaskSnackbarOpen] = useState(false);

    const deleteTask = () => e => {
        database
          .collection('tasks')
          .doc(currTask.id)
          .delete()
          .then(() => {
            setDeleteTaskDialogOpen(false);
            setDeleteTaskSnackbarOpen(true);
          })
    };

    return (
        <>
            <DeleteDialog
                itemType="task"
                dialogOpen={deleteTaskDialogOpen}
                setDialogOpen={setDeleteTaskDialogOpen}
                deleteFunc={deleteTask} />
            <ConfirmSnackbar
                snackbarOpen={deleteTaskSnackbarOpen}
                setSnackbarOpen={setDeleteTaskSnackbarOpen}
                confirmMessage='Task was deleted!' />
        </>
    );
};

export default DeleteTask;