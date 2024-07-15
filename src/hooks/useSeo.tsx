import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

const useSEO = ({ title, description, url, image }: SEOProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', description);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute('content', title);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute('content', description);
      document
        .querySelector('meta[property="og:url"]')
        ?.setAttribute('content', url);
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute('content', image);
      document
        .querySelector('meta[name="twitter:card"]')
        ?.setAttribute('content', 'summary_large_image');

      const ldJson = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: title,
        url: url,
      };

      // Narrowing the type of the script element
      let script = document.querySelector(
        'script[type="application/ld+json"]'
      ) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(ldJson);
    }
  }, [title, description, url, image]);
};

export default useSEO;
