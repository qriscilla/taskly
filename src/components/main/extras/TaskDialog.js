import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const TaskDialog = ({
    dialogOpen,
    setDialogOpen,
    title,
    actionLabel,
    action,
    currTask
}) => {
    const taskRef = useRef();
    const dueDateRef = useRef();

    const preActionFunc = e => {
        e.preventDefault();
        action(
            taskRef.current.value,
            dueDateRef.current.value
        );
    };

    return (
        <Dialog
            maxWidth='xs'
            fullWidth={true}
            open={dialogOpen} >
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={preActionFunc}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="Task"
                        type="text"
                        inputRef={taskRef}
                        defaultValue={currTask ? currTask.task : null} />
                    <div style={{marginTop: '15px', marginBottom: '-5px', color: 'gray', fontSize: '15px'}}>Due Date</div>
                    <TextField
                        margin="dense"
                        fullWidth
                        type="date"
                        inputRef={dueDateRef}
                        defaultValue={currTask ? currTask.dueDate : null} />
                </DialogContent> 
                <DialogActions>
                    <Button
                        variant="outlined"
                        size='small'
                        style={{fontWeight: '600'}}
                        onClick={() => setDialogOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        size='small'
                        style={{fontWeight: '600'}}
                        variant='contained'
                        color='primary'
                        type='submit' >
                        {actionLabel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskDialog;