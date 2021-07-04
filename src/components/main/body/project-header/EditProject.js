import React, { useState } from 'react';
import ProjectDialog from '../../extras/ProjectDialog';
import ConfirmSnackbar from '../../extras/ConfirmSnackbar';
import { database } from '../../../../firebase';
import { useProjectContext } from '../../../../contexts';

const EditProject = ({
    editProjectDialogOpen,
    setEditProjectDialogOpen
}) => {
    const { project } = useProjectContext();
    const [editProjectSnackbarOpen, setEditProjectSnackbarOpen] = useState(false);

    const updateProject = projectName => {
        database
            .collection('projects')
            .doc(project.id)
            .update({ name: projectName })
            .then(() => {
                setEditProjectDialogOpen(false);
                setEditProjectSnackbarOpen(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
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
        </>
    );
}

export default EditProject;