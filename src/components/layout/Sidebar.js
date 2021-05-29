import React, { useState } from 'react';
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  addProject: {
    position: "fixed",
    bottom: 0,
    paddingBottom: 15,
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleNesting = () => setOpen(!open);

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
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TurnedInNotOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Project 1" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TurnedInNotOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Project 2" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TurnedInNotOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Project 3" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <List>
          <ListItem className={classes.addProject}>
            <Button variant='contained' size='small' color='primary' style={{fontWeight: '600'}}>
              <AddIcon /> Add Project
            </Button>
          </ListItem>
        </List>

      </div>
    </Drawer>
  )
}

export default Sidebar;