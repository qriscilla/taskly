import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useProjectContext } from '../../../../contexts';
import ProjectMenu from './ProjectMenu';
import AddTask from './AddTask';

const useStyles = makeStyles(() => ({
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 600,
        marginBottom: 19
    },
    button: {
        padding: 1,
        margin: '0 5px',
    }
}));

const ProjectHeader = () => {
    const styles = useStyles();
    const { project, projectId } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const openProjectMenu = e => setAnchorEl(e.currentTarget);

    return (
        <Typography variant='h6' className={styles.projectHeader}>
            {project && project.name}
            <div>
                {typeof projectId === 'string' &&
                    <span>
                        <AddTask />
                        <IconButton 
                            className={styles.button} 
                            color='primary'
                            onClick={openProjectMenu} >
                            <MoreHorizIcon />   
                        </IconButton>    
                    </span>
                }
                <ProjectMenu 
                    anchorEl={anchorEl} 
                    setAnchorEl={setAnchorEl} />
            </div>
        </Typography>
    );
}

export default ProjectHeader;