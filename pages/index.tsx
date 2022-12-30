import { useEffect } from 'react'
import { useWeb3Store } from '../store/web3store';
import { connectToMetamask } from '../utils/metamask/connectMetamask';


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