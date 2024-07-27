// app/components/StructuredData.tsx
import Script from 'next/script'

export default function StructuredData() {
  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tulia Protocol - App',
        url: 'https://app.tulia.finance',
      })}
    </Script>
  )
}