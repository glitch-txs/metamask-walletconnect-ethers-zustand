import React, { useEffect } from 'react'
import { connectToMetamask, metamaskInit } from '../utils/metamaskInit'

type Props = {}

const Connect = (props: Props) => {

    useEffect(() => {
        metamaskInit()
    }, [])
    

  return (
    <button onClick={connectToMetamask} style={{cursor:'pointer'}}>Connect</button>
  )
}

export default Connect