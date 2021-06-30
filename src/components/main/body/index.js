import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import ProjectHeader from './ProjectHeader';
import Tasks from './Tasks';

const Body = () => {
  return (
    <main style={{flexGrow: '1', padding: '18px'}}>
      <Toolbar />
      <ProjectHeader />
      <Tasks />
    </main>
  );
}

export default Body;