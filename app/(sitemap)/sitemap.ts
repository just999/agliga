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
