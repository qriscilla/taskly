import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { database } from '../../firebase';
import { useAuth, useProjectContext } from '../../contexts';
import Constants from './Constants';
import Projects from './Projects';
import ProjectDialog from './extras/ProjectDialog';
import ConfirmSnackbar from './extras/ConfirmSnackbar';

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
  },
  addProject: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: 15,
  }
}));

const Sidebar = () => {
  const styles = useStyles();
  const [projects, setProjects] = useState([]);
  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [addProjectSnackbarOpen, setAddProjectSnackbarOpen] = useState(false);
  const { currentUser } = useAuth();
  const { selectProject } = useProjectContext();

  useEffect(() => {
    database.collection('projects')
      .where('userEmail', '==', currentUser.email)
      .onSnapshot(snapshot => {
          setProjects(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
          })))          
    });
  }, [currentUser.email]);

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
        <Projects projects={projects} />
        <List>
          <ListItem className={styles.addProject}>
            <Button 
              variant='contained' 
              size='small' 
              color='primary' 
              style={{fontWeight: '600'}}
              onClick={() => setAddProjectDialogOpen(true)} >
              <AddIcon /> Add Project
            </Button>
          </ListItem>
        </List>
      </div>
      <ProjectDialog
        dialogOpen={addProjectDialogOpen}
        setDialogOpen={setAddProjectDialogOpen}
        title="Add new project"
        actionFunc={addProject}
        actionType="Add" />
      <ConfirmSnackbar
        snackbarOpen={addProjectSnackbarOpen}
        setSnackbarOpen={setAddProjectSnackbarOpen}
        confirmMessage="Project was added!" />
    </Drawer>
  )
}

export default Sidebar;