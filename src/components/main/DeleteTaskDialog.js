import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const DeleteTaskDialog = ({ 
    deleteTaskDialogOpen, 
    setDeleteTaskDialogOpen,
    deleteTask,
    taskId }) => {
    return (
        <Dialog maxWidth='xs' fullWidth={true} open={deleteTaskDialogOpen}>
            <DialogTitle>Delete task?</DialogTitle>
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
                onClick={deleteTask(taskId)} >
                Delete
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTaskDialog;