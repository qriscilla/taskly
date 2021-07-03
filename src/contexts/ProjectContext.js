import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import { constants } from '../constants';
import { useAuthContext } from './AuthContext';

const ProjectContext = createContext();
const useProjectContext = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const { currentUser } = useAuthContext();

    // Upon mounting, load tasks that are "Due today"
    useEffect(() => selectProject(0), []);

    const selectProject = projectId => {
        // Set project Id regardless of whether project is a constant or a custom-made
        setProjectId(projectId);

        // If the selected project is a constant
        if (projectId < 3) {
            setProject(constants[projectId]);

            database
                .collection('tasks')
                .where('userEmail', '==', currentUser.email)
                .onSnapshot(snapshot =>
                    setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(task => {
                            const today = new Date().setHours(0, 0, 0, 0);
                            const dueDate = task.dueDate.split('-');
                            const dueDateParsed = new Date(dueDate[0], dueDate[1] - 1, dueDate[2]).setHours(0, 0, 0, 0);

                            switch (projectId) {
                                case 0:
                                    return dueDateParsed === today;
                                case 1:
                                    const oneWeekFromToday = today + (7 * 24 * 60 * 60 * 1000);
                                    return (dueDateParsed >= today) && (dueDateParsed <= oneWeekFromToday);
                                default:
                                    return !task.completed;
                            }
                        })));
        }

        // If the selected project is a custom-made
        else {
            const selectedProject = database.collection('projects').doc(projectId);
            const selectedProjectTasks = database.collection('tasks').where('projectId', '==', projectId);

            // Set (or update) selected project
            selectedProject.onSnapshot(doc => setProject(doc.data()));

            // Set (or update) tasks by the selected project
            selectedProjectTasks.onSnapshot(snapshot => 
                setTasks(snapshot.docs.map(doc => 
                    ({ id: doc.id, ...doc.data() }))));              
        }
    };

    const value = { projectId, project, selectProject, tasks };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}

export { ProjectProvider, useProjectContext };