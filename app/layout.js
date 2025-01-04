import './globals.css'
import Script from 'next/script'
import GoogleTagManagerNoscript from './components/GoogleTagManagerNoscript'

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
          src={`https://www.googletagmanager.com/gtag/js?id=G-KF8PF5C3XD`}
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
        <GoogleTagManagerNoscript />
        {children}
      </body>
    </html>
  )
}

