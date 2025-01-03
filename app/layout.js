import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'JobHut - Find Your Dream Job',
  description: 'Job listing platform for technical and non-technical positions. Explore thousands of job opportunities with all the information you need.',
  metadataBase: new URL('http://localhost:3000'),
  keywords: 'jobs, career, employment, job search, job listing, technical jobs, non-technical jobs',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://jobhut.com/',
    siteName: 'JobHut',
    images: [
      {
        url: '/LOGO.jpg',
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
    icon: '/LOGO.jpg',
    shortcut: '/LOGO.jpg',
    apple: '/LOGO.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              strategy="beforeInteractive"
            />
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
          </>
        )}
      </body>
    </html>
  );
}