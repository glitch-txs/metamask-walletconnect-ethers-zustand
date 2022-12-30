import React from 'react'

type Props = {}

//You can get the deeplink and QR Code from https://metamask.github.io/metamask-deeplinks/

const Deeplink = (props: Props) => {
  return (
    <a href='https://metamask.app.link/dapp/metamask-integration-frontend.vercel.app/' >Deeplink</a>
  )
}

export default Deeplink