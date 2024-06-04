import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private',
    },
    sitemap: 'http://181.215.69.147:3000/sitemap.xml',
  };
}
