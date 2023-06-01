import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '@mui/material/Button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PDFViewer: React.FC = () => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const prevPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    };

    return (

        <>
            <Document
                file="../../assets/pdf_example.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} pageIndex={0} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <Button
                variant="contained"
                color="primary"
                onClick={prevPage}
                disabled={pageNumber <= 1}
            >
                Previous Page
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={nextPage}
                disabled={pageNumber >= numPages || !numPages}
            >
                Next Page
            </Button>
        </>
    );
};

export default PDFViewer;
