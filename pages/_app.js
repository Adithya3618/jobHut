import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
