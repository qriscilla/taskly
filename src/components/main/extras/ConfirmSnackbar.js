import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
    snackbar: {
        position: "fixed",
        bottom: 0,
        paddingBottom: 15,
        right: 0,
        paddingRight: 15
    },
    alert: {
        paddingTop: 1,
        paddingBottom: 1
    }
}));

const ConfirmSnackbar = ({
    snackbarOpen,
    setSnackbarOpen,
    confirmMessage
}) => {
    const styles = useStyles();

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
            className={styles.snackbar} >
            <Alert
                onClose={() => setSnackbarOpen(false)}
                variant='outlined'
                severity='success'
                className={styles.alert} >
                {confirmMessage}
            </Alert>
        </Snackbar>
    );
};

export default ConfirmSnackbar;