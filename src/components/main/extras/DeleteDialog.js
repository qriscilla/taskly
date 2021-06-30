import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(() => ({
    button: {
        fontWeight: 600
    }
}));

const DeleteDialog = ({ 
    itemType,
    dialogOpen, 
    setDialogOpen,
    deleteFunc 
}) => {
    const styles = useStyles();
    
    return (
        <Dialog maxWidth='xs' fullWidth={true} open={dialogOpen}>
            <DialogTitle>Delete {itemType}?</DialogTitle>
            <DialogContent>
                <DialogContentText style={{color: 'black'}}>
                    Please confirm your action. 
                    {itemType === "task"
                        ? "This will permanently delete the task."
                        : "This will permanently delete the project as well as its containing tasks."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    size='small' 
                    className={styles.button}
                    variant='outlined' 
                    color="secondary"
                    onClick={() => setDialogOpen(false)} >
                    Cancel
                </Button>
                <Button 
                    size='small' 
                    className={styles.button}
                    variant='contained' 
                    color="secondary"
                    onClick={deleteFunc()} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;