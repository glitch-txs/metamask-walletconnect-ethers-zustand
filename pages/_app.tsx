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
        <meta property="og:site_name" content="mm33" />
        <meta property='og:description' content='Boilerpalte for metamask and walletconect v2'/>
        <meta property="og:type" content="website" />
        <meta property='og:url' content='https://metamask-walletconnect-ethers-zustand.vercel.app/'/>
        <meta property='og:image' content='https://metamask-walletconnect-ethers-zustand.vercel.app/chain.jpg'/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
