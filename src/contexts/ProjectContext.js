import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { constants } from '../components/main/Constants';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);

    const selectProject = projectId => {
        setProjectId(projectId);

        if (projectId < 3) {
            setProject(constants[projectId]);

            switch (projectId) {
                case 0:
                    let currDate = new Date().setHours(0, 0, 0, 0);

                    db
                        .collection('tasks')
                        .onSnapshot(snapshot => 
                            setTasks(snapshot.docs.map(doc => 
                                doc.data()).filter(task => 
                                    task.dueDate.toDate().setHours(0, 0, 0, 0) === currDate)));

                    break;
                case 1:
                    let today = new Date().setHours(0, 0, 0, 0);
                    let oneWeekFromToday = today + (7 * 24 * 60 * 60 * 1000)
                    
                    db
                        .collection('tasks')
                        .onSnapshot(snapshot =>
                            setTasks(snapshot.docs.map(doc =>
                                doc.data()).filter(task =>
                                    task.dueDate.toDate().setHours(0, 0, 0, 0) >= today &&
                                    task.dueDate.toDate().setHours(0, 0, 0, 0) <= oneWeekFromToday)));
                    break;
                default:
                    db
                        .collection('tasks')
                        .onSnapshot(snapshot => 
                            setTasks(snapshot.docs.map(doc => 
                                doc.data()).filter(task => 
                                    !task.completed)));
                    break;
            }
        }

        else {
            const selectedProject = db.collection('projects').doc(projectId);

            selectedProject.onSnapshot(doc => setProject(doc.data()));

            db
                .collection('tasks')
                .where('projectId', '==', projectId)
                .onSnapshot(snapshot => setTasks(snapshot.docs.map(doc => doc.data())));              
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