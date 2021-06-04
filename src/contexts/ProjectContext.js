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

            const currentDate = new Date().setHours(0, 0, 0, 0);

            const setTasksWithCondition = conditionFunc => {
                database
                    .collection('tasks')
                    .onSnapshot(snapshot =>
                        setTasks(snapshot.docs.map(doc =>
                            doc.data()).filter(task => conditionFunc(task))));
            };

            switch (projectId) {
                case 0:
                    const tasksToday = task => {
                        let stringDate = task.dueDate.split('-');
                        let stringDateParsed = new Date(stringDate[0], stringDate[1] - 1, stringDate[2]).setHours(0, 0, 0, 0);

                        return stringDateParsed === currentDate;
                    };

                    setTasksWithCondition(tasksToday);
                    break;
                case 1:
                    const tasksWithin7Days = task => {
                        let stringDate = task.dueDate.split('-');
                        let stringDateParsed = new Date(stringDate[0], stringDate[1] - 1, stringDate[2]).setHours(0, 0, 0, 0);
                        let oneWeekFromToday = currentDate + (7 * 24 * 60 * 60 * 1000);

                        return (stringDateParsed >= currentDate) && (stringDateParsed <= oneWeekFromToday);
                    }

                    setTasksWithCondition(tasksWithin7Days);
                    break;
                default:
                    setTasksWithCondition(task => !task.completed);
                    break;
            }
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