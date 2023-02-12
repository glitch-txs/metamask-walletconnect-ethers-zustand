import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
