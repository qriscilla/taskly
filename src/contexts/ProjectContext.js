import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);

    const selectProject = projectId => {
        setProjectId(projectId);

        const selectedProject = db.collection('projects').doc(projectId);

        selectedProject.onSnapshot(doc => setProject(doc.data()));

        db
            .collection('tasks')
            .where('projectId', '==', projectId)
            .onSnapshot(snapshot => setTasks(snapshot.docs.map(doc => doc.data())));
    };

    const value = {
        projectId,
        project,
        selectProject,
        tasks
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}