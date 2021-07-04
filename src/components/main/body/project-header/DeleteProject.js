import React, { useState } from 'react';
import DeleteDialog from '../../extras/DeleteDialog';
import ConfirmSnackbar from '../../extras/ConfirmSnackbar';
import { database } from '../../../../firebase';
import { useProjectContext } from '../../../../contexts';

const DeleteProject = ({
    deleteProjectDialogOpen,
    setDeleteProjectDialogOpen
}) => {
    const { project, selectProject } = useProjectContext();
    const [deleteProjectSnackbarOpen, setDeleteProjectSnackbarOpen] = useState(false);

    const deleteProject = () => e => {
        database
            .collection('projects')
            .doc(project.id)
            .delete()
            .then(() => setDeleteProjectSnackbarOpen(true));

        database
            .collection('tasks')
            .where('projectId', '==', project.id)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));

        setDeleteProjectDialogOpen(false);
        selectProject(0);
    };

    return (
        <>
            <DeleteDialog 
                itemType="project"
                dialogOpen={deleteProjectDialogOpen}
                setDialogOpen={setDeleteProjectDialogOpen}
                deleteFunc={deleteProject} />
            <ConfirmSnackbar
                snackbarOpen={deleteProjectSnackbarOpen}
                setSnackbarOpen={setDeleteProjectSnackbarOpen}
                confirmMessage="Project was deleted!" />
        </>
    );
}

export default DeleteProject;