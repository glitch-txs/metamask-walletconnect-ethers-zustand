import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Metamask Zustand hehe</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Here some text title :)" />
        <meta property='og:description' content='Boilerpalte for metamask and walletconect v2'/>
        <meta property='og:url' content='https://metamask-walletconnect-ethers-zustand.vercel.app/'/>
        <meta property='og:image' content='https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png'/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
