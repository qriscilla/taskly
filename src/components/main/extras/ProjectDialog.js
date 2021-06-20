import React, { useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useProjectContext } from '../../../contexts';

const ProjectDialog = ({ 
    dialogOpen,
    setDialogOpen,
    title,
    action,
    actionLabel
}) => {
    const { project } = useProjectContext();
    const itemRef = useRef();

    const preActionFunc = e => {
        e.preventDefault();        
        action(itemRef.current.value);
    };

    return (
        <Dialog
            open={dialogOpen}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => setDialogOpen(false)} >
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={preActionFunc}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Project name'
                        type='text'
                        fullWidth
                        defaultValue={actionLabel === "Save" && project ? project.name : null}
                        inputRef={itemRef} />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size='small'
                        style={{fontWeight: '600'}}
                        color='primary'
                        onClick={() => setDialogOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        size='small'
                        style={{fontWeight: '600'}}
                        color='primary' >
                        {actionLabel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProjectDialog;