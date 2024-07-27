import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://app.tulia.finance';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/swap`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/peer-to-peer`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tulialend`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mypools`,
      lastModified: new Date(),
    },
  ];
}
