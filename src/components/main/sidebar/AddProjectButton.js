import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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

const AddProjectButton = ({ setAddProjectDialogOpen }) => {
    const styles = useStyles();

    return (
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
    );
}

export default AddProjectButton;