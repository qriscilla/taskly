import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../firebase';
import { constants } from '../constants';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        selectProject(0);
    }, []);

    const selectProject = projectId => {
        setProjectId(projectId);

        if (projectId < 3) {
            setProject(constants[projectId]);

            database
                .collection('tasks')
                .onSnapshot(snapshot =>
                    setTasks(snapshot.docs.map(doc =>
                        doc.data()).filter(task => {
                            const currentDate = new Date().setHours(0, 0, 0, 0);
                            const stringDate = task.dueDate.split('-');
                            const stringDateParsed = new Date(stringDate[0], stringDate[1] - 1, stringDate[2]).setHours(0, 0, 0, 0);

                            switch (projectId) {
                                case 0:
                                    return stringDateParsed === currentDate;
                                case 1:
                                    const oneWeekFromToday = currentDate + (7 * 24 * 60 * 60 * 1000);
                                    return (stringDateParsed >= currentDate) && (stringDateParsed <= oneWeekFromToday);
                                default:
                                    return !task.completed;
                            }
                        })));
        }

        else {
            const selectedProject = database.collection('projects').doc(projectId);

            selectedProject.onSnapshot(doc => setProject(doc.data()));

            database
                .collection('tasks')
                .where('projectId', '==', projectId)
                .onSnapshot(snapshot => setTasks(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))));              
        }
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