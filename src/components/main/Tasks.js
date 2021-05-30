import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { useProjectContext } from '../../contexts/ProjectContext';
import ProjectHeader from './ProjectHeader';

const useStyles = makeStyles((theme) => ({
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
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const { tasks } = useProjectContext();

  return (
      <main className={classes.content}>
        <Toolbar />

        <ProjectHeader />
        
        <Typography className={classes.tasks}>
            {tasks.map(task => 
                <span key={task.task}>
                    <FormControlLabel control={<Checkbox size='small' color='primary' />} />
                    {task.task}
                </span>
            )}
            <Divider />
        </Typography>
      </main>
  );
}

export default Tasks;