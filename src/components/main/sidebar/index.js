import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Constants from './Constants';
import Projects from './Projects';
import AddProject from './AddProject';

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
        <AddProject />
      </div>
    </Drawer>
  )
}

export default Sidebar;