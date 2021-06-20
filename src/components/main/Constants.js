import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { constants } from '../../constants';
import { useProjectContext } from '../../contexts';

const Constants = () => {
    const { selectProject } = useProjectContext();

    return (
        <List>
            {constants.map(constant =>
                <ListItem
                    button
                    key={constant.id}
                    onClick={() => selectProject(constant.id)} >
                    <ListItemIcon>
                        {constant.icon}
                    </ListItemIcon>
                    <ListItemText primary={constant.name} />
                </ListItem>
            )}
        </List>
    );
}

export default Constants;