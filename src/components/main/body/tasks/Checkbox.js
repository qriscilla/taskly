import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { default as MaterialCheckbox } from '@material-ui/core/Checkbox';
import { database } from '../../../../firebase';

const Checkbox = ({ task }) => {
    const toggleTaskComplete = taskId => e => {    
        database
          .collection('tasks')
          .doc(taskId)
          .update({ completed: e.target.checked });
    };

    return (
        <FormControlLabel
            control={
                <MaterialCheckbox
                    checked={task.completed}
                    size='small'
                    color='primary'
                    onChange={toggleTaskComplete(task.id)} />
            } />
    );
}

export default Checkbox;