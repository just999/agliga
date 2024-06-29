// app/page.tsx
import Container from '@/components/container';
import RssFeed from '@/components/rss-feed';
import React from 'react';

const RSSPage: React.FC = () => {
  return (
    <Container>
      <h1>My RSS Feed</h1>
      <RssFeed />
    </Container>
  );
};

export default RSSPage;
