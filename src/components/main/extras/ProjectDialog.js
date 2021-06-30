import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useProjectContext } from '../../../contexts';

const useStyles = makeStyles(() => ({
    button: {
        fontWeight: 600
    }
}));

const ProjectDialog = ({ 
    dialogOpen,
    setDialogOpen,
    title,
    action,
    actionLabel
}) => {
    const { project } = useProjectContext();
    const itemRef = useRef();
    const styles = useStyles();

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
                        className={styles.button}
                        color='primary'
                        onClick={() => setDialogOpen(false)} >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        size='small'
                        className={styles.button}
                        color='primary' >
                        {actionLabel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProjectDialog;