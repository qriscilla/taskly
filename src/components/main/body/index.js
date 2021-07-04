import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ProjectHeader from './project-header';
import Tasks from './tasks';

const useStyles = makeStyles(() => ({
  main: {
    flexGrow: 1,
    padding: 18
  }
}));

const Body = () => {
  const styles = useStyles();

  return (
    <main className={styles.main}>
      <Toolbar />
      <ProjectHeader />
      <Tasks />
    </main>
  );
}

export default Body;