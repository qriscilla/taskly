import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Tasks from './Tasks';

const index = () => {
  return (
    <div style={{display: 'flex'}}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default index;