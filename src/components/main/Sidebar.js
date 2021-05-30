import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Toolbar from '@material-ui/core/Toolbar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useProjectContext } from '../../contexts/ProjectContext';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
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
    position: "fixed",
    bottom: 0,
    paddingBottom: 15,
  },
  projectLink: {
    textDecoration: 'none'
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const { selectProject } = useProjectContext();
  const projectNameRef = useRef();

  useEffect(() => {
    db.collection('projects')
      .where('userEmail', '==', currentUser.email)
      .onSnapshot(snapshot => {
        setProjects(snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        })))
    })
  }, [currentUser.email]);

  const toggleNesting = () => setOpen(!open);

  const addProject = e => {
    e.preventDefault();

    let projectName = projectNameRef.current.value;

    setError('');
    setMessage('');

    db
      .collection('projects')
      .add({
        name: projectName,
        userEmail: currentUser.email
      })
      .then(res => setMessage(`${projectName} was successfully created.`))
      .catch(err => setError(err.message));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }} >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary='Due today' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary='Due within 7 days' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <DataUsageIcon />
            </ListItemIcon>
            <ListItemText primary='All incomplete tasks' />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button onClick={toggleNesting}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {projects.map(project =>
                <ListItem 
                  button 
                  className={classes.nested} 
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
          <ListItem className={classes.addProject}>
            <Button 
              variant='contained' 
              size='small' 
              color='primary' 
              style={{fontWeight: '600'}}
              onClick={() => setDialogOpen(true)} >
              <AddIcon /> Add Project
            </Button>

            <Dialog 
              open={dialogOpen} 
              fullWidth={true}
              maxWidth='xs'
              onClose={() => setDialogOpen(false)} >
              <DialogTitle id="form-dialog-title">Add new project</DialogTitle>
              {error && <Alert severity='error'>{error}</Alert>}
              {message && <Alert severity='success'>{message}</Alert>}
              <form onSubmit={addProject}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project-name"
                    label="Project name"
                    type="text"
                    fullWidth
                    inputRef={projectNameRef}
                  />
                </DialogContent>
                <DialogActions>
                  <Button 
                    variant='outlined'
                    size='small'
                    style={{fontWeight: '600'}}
                    onClick={() => setDialogOpen(false)} 
                    color="primary" >
                    Cancel
                  </Button>
                  <Button 
                    type='submit'
                    variant='contained'
                    size='small'
                    style={{fontWeight: '600'}}
                    color="primary" >
                    Add
                  </Button>
                </DialogActions>                
              </form>
            </Dialog>
          </ListItem>
        </List>

      </div>
    </Drawer>
  )
}

export default Sidebar;