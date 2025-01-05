import './globals.css';
import Script from 'next/script';
import GoogleTagManagerNoscript from './components/GoogleTagManagerNoscript';

export const metadata = {
  metadataBase: new URL('https://jobhut.com'),
  title: {
    default: 'JobHut - Find Your Dream Job',
    template: '%s | JobHut'
  },
  description: 'JobHut: Your premier job listing platform for technical and non-technical positions. Explore thousands of career opportunities with comprehensive information to guide your job search.',
  keywords: ['jobs', 'career', 'employment', 'job search', 'job listing', 'technical jobs', 'non-technical jobs'],
  authors: [{ name: 'JobHut' }],
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
    card: 'summary_large_image',
    site: '@jobhut',
  },
  icons: {
    icon: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
    shortcut: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
    apple: 'https://github.com/saibadarinadh/jobHut/blob/main/public/LOGO.jpg?raw=true',
  },
  canonical: 'https://jobhut.com',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5VRB6HMK');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KF8PF5C3XD"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KF8PF5C3XD', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* End Google Analytics */}
      </head>
      <body>
        {/* Google Tag Manager (No Script) */}
        <GoogleTagManagerNoscript />
        {children}
      </body>
    </html>
  );
}

