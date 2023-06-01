import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import cover_example from '../../assets/cover_example.png';

export default function Review() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Review Book
            </Typography>
            <Avatar
                alt="Cover"
                src={cover_example}
                sx={{ width: 500, height: 300 }}
                variant='square'
            />
        </React.Fragment>
    );
}