import React from 'react';
import { Box, Paper } from '@mui/material';
import { colors } from 'Helpers/ColorHelper';

export default function Card(props) {
    return (
        <Box
            style={{
                border: `2px solid ${colors.white}`,
                borderRadius: '15px',
                boxShadow: `-3px 3px 0px ${colors.white}`,
                width: props.fullWidth ? '100%' : 'max-content',
                ...props.styleContainer
            }}
        >
            <Paper {...props}  
                sx={{ 
                    backgroundColor: props.white ? colors.white : colors.secondary, 
                    color: colors.black,
                    boxShadow: `-3px 3px 0px ${colors.black}`,
                    border: `3px solid ${colors.black}`,
                    borderRadius: '15px',
                    width: props.fullWidth && 'auto',
                    ...props.style
                }} 
            >
                {props.children}
            </Paper>
        </Box>
    );
}