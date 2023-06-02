import { useState } from 'react';
export interface BookDetails {
    text_pages: [{'title': string, 'story': string}],
    image_urls: string[]
}
export const useJsonPost = (url:string = "http://localhost:5000/book"):[(data: string) => Promise<any>, boolean, BookDetails] => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<BookDetails>({text_pages: [{'title': '', 'story': ''}], image_urls: ['https://picsum.photos/200']});
  const postJson = async (data:string) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const json = await response.json();
      console.log(json);
      setResponseData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return [postJson, loading, responseData];
};

export async function getPdf() {
  const response = await fetch('http://localhost:5000/send_pdf');

  if (response.ok) {
    const data = await response.blob();
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error(`Error fetching PDF: ${response.statusText}`);
  }
}