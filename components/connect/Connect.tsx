import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';
import { useWeb3Store } from '../../store/web3store';
import s from './Connect.module.css'
import Image from 'next/image';
import trust from '../../public/trust.svg'
import MetaLogo from './metamaskLogo/MetaLogo';


export default function Connect() {

  const web3Init = useWeb3Store((state)=>state.web3Init)
  const connectWC = useWeb3Store((state)=>state.connectWC)
  const connectMM = useWeb3Store((state)=>state.connectMetamask)
  const isConnecting = useWeb3Store((state)=>state.isConnecting)
  const userAccount = useWeb3Store((state)=>state.userAccount)
  
  const [modal, setModal] = useState<boolean>(false)

  const handleClick = (connect: ()=>void)=>{
    setModal(false)
    connect()
  }

  const handleConnect = ()=>{
    //User will only be able to connect if he's disconnected.
    if(userAccount != '') return
    setModal(true)
  }

  useEffect(()=>{
    web3Init()
  },[])

  return (
    <>
      <button onClick={handleConnect} >{ userAccount != '' ? 'Connected' : (isConnecting ? 'Loading' : 'Connect') }</button>

      <Modal modal={modal} setModal={setModal} >

      <div className={s.btnContainer} onClick={()=>handleClick(connectMM)}>
        <MetaLogo/>
        Metamask
        <span>Connect to Your MetaMask Wallet</span>
      </div>
      <hr className={s.hr} />
      <div className={s.btnContainer} onClick={()=>handleClick(connectWC)}>
        <Image src={trust} width={60} alt='' />
        Trust Wallet
        <span>Scan with Walletconnect to connect</span>
      </div>

      </Modal>
    </>
  )
}