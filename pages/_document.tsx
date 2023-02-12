import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Metamask Zustand jasndjansdakopokp" />
        <meta property="og:title" content="Here some text title :)" />
        <meta property='og:type' content='Boilerpalte for metamask and walletconect v2'/>
        <meta property='og:url' content='https://metamask-walletconnect-ethers-zustand.vercel.app/'/>
        <meta property='og:image' content='https://metamask-walletconnect-ethers-zustand.vercel.app/chain.jpg'/>
      </Head>
      <body>
        <Main />
        <div id='modal'/>
        <div id='modalWarn'/>
        <NextScript />
      </body>
    </Html>
  )
}
