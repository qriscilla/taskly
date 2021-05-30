import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [project, setProject] = useState({
        name: 'Due today',
        email: currentUser.email
    });
    const [tasks, setTasks] = useState([]);

    const selectProject = projectId => {
        let selectedProject = db.collection('projects').doc(projectId);

        db
            .collection('tasks')
            .where('projectId', '==', projectId)
            .onSnapshot(snapshot => {
                setTasks(snapshot.docs.map(doc => ({
                    completed: doc.data().completed,
                    dueDate: doc.data().dueDate,
                    task: doc.data().task
                })));
            });

        selectedProject.get().then(doc => setProject(doc.data()));
    };

    const value = {
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