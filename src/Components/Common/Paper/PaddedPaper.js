import React from 'react';
import { Paper } from '@mui/material';
import { colors } from 'Helpers/ColorHelper';

export default function Card(props) {
    return (
        <Paper {...props}  
            sx={{ 
                padding: '1.8em',
                backgroundColor: colors.white,
                overflow: 'contain',
                borderRadius: 3,
                ...props.style
            }} 
        >
            {props.children}
        </Paper>
    );
}