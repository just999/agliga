// import { getPosts } from '@/lib/queries/posts';

// import { MetadataRoute } from 'next';

// const website_host_url = process.env.NEXT_PUBLIC_DOMAIN;

// type changeFrequency =
//   | 'yearly'
//   | 'monthly'
//   | 'weekly'
//   | 'daily'
//   | 'hourly'
//   | 'always'
//   | 'never';

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const news = await getPosts();

//   const changeFrequency = 'daily' as changeFrequency;
//   if (!news) return [];

//   const posts = news?.map(({ id, createdAt }) => ({
//     url: `${website_host_url}/posts/${id}`,
//     lastModified: createdAt.toISOString(),
//     changeFrequency,
//   }));

//   const routes = ['', '/about', '/posts', '/soccer'].map((route) => ({
//     url: `${website_host_url}${route}`,
//     lastModified: new Date().toISOString(),
//     changeFrequency,
//   }));

//   return [...routes, ...(posts || [])];
// }
import { getPosts } from '@/lib/queries/posts';

import { MetadataRoute } from 'next';

const website_host_url = process.env.NEXT_PUBLIC_DOMAIN;

type changeFrequency =
  | 'yearly'
  | 'monthly'
  | 'weekly'
  | 'daily'
  | 'hourly'
  | 'always'
  | 'never';

// Consider adding error handling (replace with your error handling logic)
async function getPostsWithFallback() {
  try {
    return await getPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return an empty array in case of errors
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getPostsWithFallback();

  const changeFrequency = 'daily' as changeFrequency;

  // Handle potential missing news data
  if (!news) {
    console.warn('No posts found for sitemap generation.');
    return [];
  }

  const posts = news.map(({ id, createdAt }) => ({
    url: `${website_host_url}/posts/${id}`,
    lastModified: createdAt.toISOString(), // Assuming compatible date format
    changeFrequency,
  }));

  const routes = ['', '/about', '/posts', '/soccer'].map((route) => ({
    url: `${website_host_url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
  }));

  return [...routes, ...posts];
}
