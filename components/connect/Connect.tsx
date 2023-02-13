import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';
import { useWeb3Store } from '../../store/web3store';
import s from './Connect.module.css'
import Image from 'next/image';
import trust from '../../public/trust.svg'
import MetaLogo from './metamaskLogo/MetaLogo';
import { isOnMobile } from '../../utils/handleMobile';
import ModalWarn from '../ModalWarn/ModalWarn';


export default function Connect() {

  const web3Init = useWeb3Store((state)=>state.web3Init)
  const connectWC = useWeb3Store((state)=>state.connectWC)
  const disconnectWC = useWeb3Store((state)=>state.disconnectWC)
  const connectMM = useWeb3Store((state)=>state.connectMetamask)
  const isLoading = useWeb3Store((state)=>state.isLoading)
  const userAccount = useWeb3Store((state)=>state.userAccount)
  
  const [modal, setModal] = useState<boolean>(false)

  const mobile = isOnMobile()

  const handleClick = (connect: ()=>void)=>{
    //If user is on mobile WC will open a link for options like Metamask or Walletconnect
      setModal(false)
      connect()
  }

  const handleConnect = ()=>{
    //User will only be able to connect if he's disconnected.
    if(userAccount != ''){
      disconnectWC()
      return
    }

    if (isLoading) return

    setModal(true)
  }

  useEffect(()=>{
    web3Init()
  },[])

  return (
    <div className={s.container}>
      <button onClick={handleConnect} >{ userAccount != '' ? 'Connected' : (isLoading ? 'Connecting' : 'Connect') }</button>

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
      <ModalWarn setModal={setModal}/>
    </div>
  )
}