import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { database } from '../../firebase';
import { useAuth, useProjectContext } from '../../contexts';
import { constants } from '../../constants';
import ProjectDialog from './dialogs/ProjectDialog';
import ConfirmSnackbar from './ConfirmSnackbar';

const useStyles = makeStyles(theme => ({
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  addProject: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: 15,
  }
}));

const Sidebar = () => {
  const styles = useStyles();
  const [collapseOpen, setCollapseOpen] = useState(false);
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

  const toggleCollapse = () => setCollapseOpen(!collapseOpen);

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
        <List>
          {constants.map(constant =>
            <ListItem 
              button 
              key={constant.id}
              onClick={() => selectProject(constant.id)} >
              <ListItemIcon>
                {constant.icon}
              </ListItemIcon>
              <ListItemText primary={constant.name} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={toggleCollapse}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
            {collapseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {projects.map(project =>
                <ListItem 
                  button 
                  className={styles.nested} 
                  key={project.id}
                  onClick={() => selectProject(project.id)} >
                  <ListItemIcon>
                    <TurnedInNotOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.name} />
                </ListItem> 
              )}
            </List>
          </Collapse>
        </List>
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