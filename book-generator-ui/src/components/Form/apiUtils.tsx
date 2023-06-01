import { useState } from 'react';

export const useJsonPost = (url:string = "http://localhost:5000/book") => {
  const [loading, setLoading] = useState(false);

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
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return [postJson, loading];
};