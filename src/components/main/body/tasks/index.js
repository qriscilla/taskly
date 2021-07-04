import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import { useProjectContext } from '../../../../contexts';
import Checkbox from './Checkbox';
import TaskMenu from './TaskMenu';

const useStyles = makeStyles(theme => ({
    tasks: {
        display: 'flex',
        flexDirection: 'column'
    },
    task: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    elipses: {
      color: 'black',
      width: 10,
      height: 10,
      marginRight: 6
    },
    dueDate: {
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        color: theme.palette.primary.main,
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 10,
        padding: '5px 10px',
        marginRight: 10
    }
}));

const Tasks = () => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currTask, setCurrTask] = useState({});
    const { tasks } = useProjectContext();

    const openTaskMenu = task => e => {
        setCurrTask(task);
        setAnchorEl(e.currentTarget);
    };

    return (
        <div>
            <Typography className={styles.tasks}>
                {tasks.map(task =>
                    <span key={task.id} className={styles.task}>
                        <span>
                            <Checkbox task={task} />
                            {task.task}
                        </span>
                        <span>
                            <span className={styles.dueDate}>
                                {task.dueDate}
                            </span>
                            <IconButton
                                className={styles.elipses}
                                onClick={openTaskMenu(task)} >
                                <MoreHorizIcon />
                            </IconButton>                            
                        </span>
                    </span>
                )}
            </Typography>
            <Divider />
            <TaskMenu 
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                currTask={currTask} />
        </div>
    );
}

export default Tasks;