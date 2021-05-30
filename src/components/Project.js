import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: '600',
      marginBottom: '19px'
  },
  tasks: {
      display: 'flex',
      flexDirection: 'column'
  },
  button: {
      padding: '1px',
      margin: '0 5px 0 5px',
    //   color: 'black'
  },
  addTaskButton: {
    fontWeight: '600', 
    width: '120px',
    marginTop: '20px'
  },
}));

const Project = () => {
  const classes = useStyles();
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    setProjectName(new URLSearchParams(window.location.search).get('id'));
  });

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar />

      <Sidebar />

      <main className={classes.content}>
        <Toolbar />

        <Typography variant='h6' className={classes.projectHeader}>
            {projectName}
            <span>
                <IconButton className={classes.button} color='primary'>
                    <AddIcon />
                </IconButton>
                <IconButton className={classes.button} color='primary'>
                    <MoreHorizIcon />
                </IconButton>
            </span>
        </Typography>
        
        <Typography className={classes.tasks}>
            <span>
                <FormControlLabel control={<Checkbox size='small' color='primary' />} />
                Task
            </span>
            <Divider />
            <span>
                <FormControlLabel control={<Checkbox size='small' color='primary' />} />
                Task
            </span>
            <Divider />
            <span>
                <FormControlLabel control={<Checkbox size='small' color='primary' />} />
                Task
            </span>
            <Divider />
            <span>
                <FormControlLabel control={<Checkbox size='small' color='primary' />} />
                Task
            </span>
            <Divider />
        </Typography>

      </main>
    </div>
  );
}

export default Project;