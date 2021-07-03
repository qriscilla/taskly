import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import { database } from '../../../firebase';
import { useAuthContext, useProjectContext } from '../../../contexts';
import Constants from './Constants';
import Projects from './Projects';
import AddProjectButton from './AddProjectButton';
import ProjectDialog from '../extras/ProjectDialog';
import ConfirmSnackbar from '../extras/ConfirmSnackbar';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
  }
}));

const Sidebar = () => {
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
    <Drawer
      className={styles.drawer}
      variant="permanent"
      styles={{paper: styles.drawerPaper}} >
      <Toolbar />
      <div className={styles.drawerContainer}>
        <Constants />
        <Divider />
        <Projects />
        <AddProjectButton setAddProjectDialogOpen={setAddProjectDialogOpen} />
      </div>
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
    </Drawer>
  )
}

export default Sidebar;