// app/livescore/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

import Loader from '../loader';
import { HeadingLogo } from '../shadcn/ui';

interface LivescoreData {
  html: string;
  error?: string;
}

const LiveScore: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [htmlData, setHtmlData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/livescore');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: LivescoreData = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setHtmlData(data.html);
      } catch (error) {
        setError('Error fetching livescore');
        console.error('Error fetching livescore:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='live-score-container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeadingLogo title='Live' center />
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlData }} />
          )}
        </>
      )}
    </div>
  );
};

export default LiveScore;
