// components/RSSFeed.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface RSSItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
}

const RSSFeed: React.FC = () => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rss');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h3>
            <a href={item.link}>{item.title}</a>
          </h3>
          <p>{item.contentSnippet}</p>
          <p>
            <em>Posted on {new Date(item.pubDate).toLocaleDateString()}</em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default RSSFeed;
