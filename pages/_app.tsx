import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../component/Header'; // Adjust the path if necessary
import Footer from '../component/Footer'; // Adjust the path if necessary
//import '../styles/globals.css'; // Import global styles if you have any

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Meta viewport tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Property Site</title> {/* Default title for your app */}
      </Head>
      <Header /> {/* Global Header */}
      <main style={{ minHeight: 'calc(100vh - 100px)' }}> {/* Adjust height to account for Header/Footer */}
        <Component {...pageProps} />
      </main>
      <Footer /> {/* Global Footer */}
    </>
  );
}