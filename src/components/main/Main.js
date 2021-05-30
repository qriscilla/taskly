import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Tasks from './Tasks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar />

      <Sidebar />

      <Tasks />
    </div>
  );
}

export default Main;