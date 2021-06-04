import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DataUsageIcon from '@material-ui/icons/DataUsage';

export const constants = [
    { 
        id: 0, 
        name: 'Due today',
        icon: <TodayIcon />
    },
    { 
        id: 1, 
        name: 'Due within 7 days',
        icon: <DateRangeIcon />
    },
    { 
        id: 2, 
        name: 'All incomplete tasks',
        icon: <DataUsageIcon />
    }
];