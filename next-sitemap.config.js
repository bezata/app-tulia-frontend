/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://app.tulia.finance',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/api/*', '/404', '/500'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: 'public',
};