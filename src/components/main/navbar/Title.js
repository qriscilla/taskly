import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutline from '@material-ui/icons/DoneOutline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(() => ({
    title: {
      flexGrow: 1,
      fontWeight: 600,
      marginLeft: 15
    },
    signOutMenu: {
      marginRight: '-15px'
    }
  }));

const Title = ({ openSignOutMenu }) => {
    const styles = useStyles();

    return (
        <>
            <DoneOutline />
            <Typography variant="h6" className={styles.title}>
                taskly
            </Typography>
            <Button color="inherit" onClick={openSignOutMenu} className={styles.signOutMenu}>
                <AccountCircle />
            </Button>
        </>
    );
}

export default Title;