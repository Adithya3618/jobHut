import './globals.css'

export const metadata = {
  title: 'JobHut - Find Your Dream Job',
  description: 'Job listing platform for technical and non-technical positions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Page Title */}
        <title>JobHut - Find Your Dream Job</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Job listing platform for technical and non-technical positions"
        />

        {/* Favicon */}
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />

        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </head>
      <body>
        {/* You can place Google AdSense Ads here, if needed */}
        <div>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXX" // Replace with your AdSense client ID
            data-ad-slot="XXXXXXX"        // Replace with your ad slot ID
            data-ad-format="auto"
          ></ins>
        </div>

        {children}
      </body>
    </html>
  )
}
