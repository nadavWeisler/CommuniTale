import * as React from 'react';
import Typography from '@mui/material/Typography';
import { BookDetails } from './apiUtils';

export default function Review(props: {bookData: BookDetails}) {
    const { text_pages, image_urls } = props.bookData;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Review Book
            </Typography>
            <div>
                {text_pages.map((story:{title:string, story:string}, index:number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <h2>{story.title}</h2>
                        <p>{story.story}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img src={image_urls[index]} alt={text_pages[index].title} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}