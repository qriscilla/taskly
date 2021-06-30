import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Body from './body';

const Main = () => {
  return (
    <div style={{display: 'flex'}}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Body />
    </div>
  );
};

export default Main;