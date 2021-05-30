import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useProjectContext } from '../../contexts/ProjectContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '600',
        marginBottom: '19px'
    },
    button: {
        padding: '1px',
        margin: '0 5px 0 5px',
    },
}));

const ProjectHeader = () => {
    const classes = useStyles();
    const { project, projectId } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const deleteProject = () => {
        db
            .collection('projects')
            .doc(projectId)
            .delete()
            .then(() => console.log('successfully deleted project'));

        setDialogOpen(false);
    }

    return (
        <Typography variant='h6' className={classes.projectHeader}>
            {/* {project.name} */}
            <span>
                <IconButton className={classes.button} color='primary'>
                    <AddIcon />
                </IconButton>
                <IconButton 
                    className={classes.button} 
                    color='primary'
                    onClick={handleClick} >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted 
                    open={Boolean(anchorEl)}
                    onClose={handleClose} >
                    <MenuItem>Rename</MenuItem>
                    <MenuItem onClick={() => {
                        setAnchorEl(false);
                        setDialogOpen(true);
                    }} >Delete</MenuItem>

                    <Dialog maxWidth='xs' fullWidth={true} open={dialogOpen}>
                        <DialogTitle id="form-dialog-title">Delete project?</DialogTitle>
                        <DialogContent>
                        <DialogContentText style={{color: 'black'}}>
                            Please confirm your action. This will permanently delete the project as well as its containing tasks.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button 
                            size='small' 
                            style={{fontWeight: '600'}} 
                            variant='outlined' 
                            color="secondary"
                            onClick={() => setDialogOpen(false)} >
                            Cancel
                        </Button>
                        <Button 
                            size='small' 
                            style={{fontWeight: '600'}} 
                            variant='contained' 
                            color="secondary"
                            onClick={deleteProject} >
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Menu>
            </span>
        </Typography>
    );
}

export default ProjectHeader;