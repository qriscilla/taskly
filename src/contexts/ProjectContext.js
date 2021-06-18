import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import { constants } from '../constants';

const ProjectContext = createContext();
const useProjectContext = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => selectProject(0), []);

    const selectProject = projectId => {
        setProjectId(projectId);

        if (projectId < 3) {
            setProject(constants[projectId]);

            database
                .collection('tasks')
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

        else {
            const selectedProject = database.collection('projects').doc(projectId);
            const allTasks = database.collection('tasks').where('projectId', '==', projectId);

            selectedProject.onSnapshot(doc => setProject(doc.data()));

            allTasks.onSnapshot(snapshot => 
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

export { useProjectContext, ProjectProvider };