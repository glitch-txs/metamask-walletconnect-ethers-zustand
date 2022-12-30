import { UniversalProvider } from '@walletconnect/universal-provider';
import { Web3Modal } from '@web3modal/standalone'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { useWeb3Store } from '../store/web3store';
import { connectToMetamask } from '../utils/metamask/connectMetamask';
import { removeEventsMetamask } from '../utils/metamask/helpers/eventListeners';
import { metamaskInit } from '../utils/metamask/metamaskInit';


export default function HomePage() {

  const web3Init = useWeb3Store((state)=>state.web3Init)
  const connectWC = useWeb3Store((state)=>state.connectWC)

  useEffect(()=>{
    web3Init()
  },[])

  return (
    <>
    <button onClick={connectWC}>Connect Wallet</button>
    <button onClick={connectToMetamask}>Connect Metamask</button>
    <button >Bye Wallet</button>
    </>
  )
}