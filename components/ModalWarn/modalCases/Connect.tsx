import React from 'react'
import s from './case.module.css'

type Props = {
  setModal: (modal: boolean)=>void
  clearModal: ()=> void
}

const Connect = ({setModal, clearModal}: Props) => {

  const handleConnect = ()=>{
    clearModal()
    setModal(true)
  }

  return (
    <div className={s.container}>
      <div className={s.title} >Connect Your Wallet</div>
      <div className={s.description} >Your wallet is currently disconnected</div>
      <button onClick={handleConnect} >Connect</button>
    </div>
  )
}

export default Connect