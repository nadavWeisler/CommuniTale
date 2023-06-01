import { useState } from 'react';
import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
    file: string;
}

export function PDFViewer(props: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <>
            <Document
                file="https://html.spec.whatwg.org/print.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </>
    );
}