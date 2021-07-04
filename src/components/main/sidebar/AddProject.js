import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { database } from '../../../firebase';
import { useAuthContext, useProjectContext } from '../../../contexts';
import ProjectDialog from '../extras/ProjectDialog';
import ConfirmSnackbar from '../extras/ConfirmSnackbar';

const useStyles = makeStyles(() => ({
    addProject: {
      position: 'fixed',
      bottom: 0,
      paddingBottom: 15,
    },
    button: {
        fontWeight: 600
    }
}));

const AddProject = () => {
    const styles = useStyles();
    const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
    const [addProjectSnackbarOpen, setAddProjectSnackbarOpen] = useState(false);
    const { currentUser } = useAuthContext();
    const { selectProject } = useProjectContext();

    const addProject = projectName => {
        database
          .collection('projects')
          .add({
            name: projectName,
            userEmail: currentUser.email
          })
          .then(res => {
            setAddProjectDialogOpen(false);
            setAddProjectSnackbarOpen(true);
            selectProject(res.id);
          })
          .catch(err => console.log(err.message));
    };

    return (
        <div>
            <List>
                <ListItem className={styles.addProject}>
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        className={styles.button}
                        onClick={() => setAddProjectDialogOpen(true)} >
                        <AddIcon /> Add Project
                    </Button>
                </ListItem>
            </List>

            <ProjectDialog
                dialogOpen={addProjectDialogOpen}
                setDialogOpen={setAddProjectDialogOpen}
                title="Add new project"
                action={addProject}
                actionLabel="Add" />
            <ConfirmSnackbar
                snackbarOpen={addProjectSnackbarOpen}
                setSnackbarOpen={setAddProjectSnackbarOpen}
                confirmMessage="Project was added!" />
        </div>
    );
}

export default AddProject;