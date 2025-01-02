import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'JobHut - Find Your Dream Job',
  description: 'Job listing platform for technical and non-technical positions. Explore thousands of job opportunities with all the information you need.',
  keywords: 'jobs, career, employment, job search, job listing, technical jobs, non-technical jobs',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://jobhut.com/',
    siteName: 'JobHut',
    images: [
      {
        url: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
        width: 1200,
        height: 630,
        alt: 'JobHut - Find Your Dream Job',
      },
    ],
  },
  twitter: {
    handle: '@jobhut',
    site: '@jobhut',
    cardType: 'summary_large_image',
  },
  icons: {
    icon: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
    shortcut: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
    apple: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
        {/* <Script id="adsense-init">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({});
          `}
        </Script> */}
      </body>
    </html>
  )
}

