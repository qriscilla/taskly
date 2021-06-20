import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ProjectMenu from './ProjectMenu';
import DeleteDialog from '../extras/DeleteDialog';
import TaskDialog from '../extras/TaskDialog';
import ProjectDialog from '../extras/ProjectDialog';
import ConfirmSnackbar from '../extras/ConfirmSnackbar';
import { useProjectContext } from '../../../contexts';
import { database } from '../../../firebase';

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
    const { project, projectId, selectProject } = useProjectContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
    const [editProjectSnackbarOpen, setEditProjectSnackbarOpen] = useState(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [deleteProjectSnackbarOpen, setDeleteProjectSnackbarOpen] = useState(false);
    const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
    const [addTaskSnackbarOpen, setAddTaskSnackbarOpen] = useState(false);

    const openProjectMenu = e => setAnchorEl(e.currentTarget);

    const updateProject = projectName => {
        database
            .collection('projects')
            .doc(projectId)
            .update({ name: projectName })
            .then(() => {
                setEditProjectDialogOpen(false);
                setEditProjectSnackbarOpen(true);
            })
            .catch(err => console.log(err));
    };
    
    const deleteProject = () => e => {
        database
            .collection('projects')
            .doc(projectId)
            .delete()
            .then(() => setDeleteProjectSnackbarOpen(true));

        database
            .collection('tasks')
            .where('projectId', '==', projectId)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));

        setDeleteProjectDialogOpen(false);
        selectProject(0);
    };

    const addTask = (task, dueDate) => {
        database
            .collection('tasks')
            .add({
                task: task,
                completed: false,
                projectId: projectId,
                dueDate: dueDate
            })
            .then(() => {
                setAddTaskDialogOpen(false);
                setAddTaskSnackbarOpen(true);
            })
            .catch(err => console.log(err.message));
    };

    return (
        <Typography variant='h6' className={styles.projectHeader}>
            {project && project.name}
            <span>
                {typeof projectId === 'string' &&
                    <>
                        <IconButton 
                            className={styles.button} 
                            color='primary'
                            onClick={() => setAddTaskDialogOpen(true)} >
                            <AddIcon />
                        </IconButton>  
                        <IconButton 
                            className={styles.button} 
                            color='primary'
                            onClick={openProjectMenu} >
                            <MoreHorizIcon />   
                        </IconButton>     
                    </>
                }
                <ProjectMenu 
                    anchorEl={anchorEl} 
                    setAnchorEl={setAnchorEl} 
                    setEditProjectDialogOpen={setEditProjectDialogOpen} 
                    setDeleteProjectDialogOpen={setDeleteProjectDialogOpen} />
            </span>
            <ProjectDialog
                dialogOpen={editProjectDialogOpen}
                setDialogOpen={setEditProjectDialogOpen}
                title="Edit project"
                action={updateProject}
                actionLabel="Save" />
            <ConfirmSnackbar
                snackbarOpen={editProjectSnackbarOpen}
                setSnackbarOpen={setEditProjectSnackbarOpen}
                confirmMessage="Project was updated!" />
            <DeleteDialog 
                itemType="project"
                dialogOpen={deleteProjectDialogOpen}
                setDialogOpen={setDeleteProjectDialogOpen}
                deleteFunc={deleteProject} />
            <ConfirmSnackbar
                snackbarOpen={deleteProjectSnackbarOpen}
                setSnackbarOpen={setDeleteProjectSnackbarOpen}
                confirmMessage="Project was deleted!" />
            <TaskDialog
                dialogOpen={addTaskDialogOpen}
                setDialogOpen={setAddTaskDialogOpen}
                title='Add new task'
                actionLabel="Add"
                action={addTask}
                currTask={null} />
            <ConfirmSnackbar
                snackbarOpen={addTaskSnackbarOpen}
                setSnackbarOpen={setAddTaskSnackbarOpen}
                confirmMessage="Task was added!" />
        </Typography>
    );
}

export default ProjectHeader;