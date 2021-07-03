import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import { useAuthContext, useProjectContext } from '../../../contexts';
import { database } from '../../../firebase';

const useStyles = makeStyles(theme => ({
    nested: {
      paddingLeft: theme.spacing(4),
    }
}));

const Projects = () => {
    const styles = useStyles();
    const [projects, setProjects] = useState([]);
    const [collapseOpen, setCollapseOpen] = useState(false);
    const { selectProject } = useProjectContext();
    const { currentUser } = useAuthContext();

    useEffect(() => {
        database.collection('projects')
          .where('userEmail', '==', currentUser.email)
          .onSnapshot(snapshot => {
              setProjects(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
              })))          
        });
      }, [currentUser.email]);

    const toggleCollapse = () => setCollapseOpen(!collapseOpen);

    return (
        <List>
            <ListItem button onClick={toggleCollapse}>
                <ListItemIcon>
                    <CollectionsBookmarkIcon />
                </ListItemIcon>
                <ListItemText primary='Projects' />
                {collapseOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {projects.map(project =>
                        <ListItem
                            button
                            className={styles.nested}
                            key={project.id}
                            onClick={() => selectProject(project.id)} >
                            <ListItemIcon>
                                <TurnedInNotOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={project.name} />
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </List>
    );
}

export default Projects;