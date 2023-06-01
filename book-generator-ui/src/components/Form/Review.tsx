import * as React from 'react';
import Typography from '@mui/material/Typography';
import BookPreview from './BookPreview';

export default function Review() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Review Book
            </Typography>
            <BookPreview />
        </React.Fragment>
    );
}