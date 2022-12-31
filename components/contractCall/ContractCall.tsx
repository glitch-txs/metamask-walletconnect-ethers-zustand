import React, { useState } from 'react'
import { CallInfo, ContractInfo, useWeb3Store } from '../../store/web3store'
import s from './ContractCall.module.css'

const ContractCall = () => {

  const [answer, setAnswer] = useState()

  const contractInfo: ContractInfo = {
    address:'0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    abi: [
        "function name() view returns (string)",
        "function approve(address spender, uint256 amount)"
      ]
  }

  const callInfo: CallInfo = {
    name: 'name',
    params: [],

    //if you set action to 'write' you can pass setStatus as third argument and you'll get the status of the transaction.
    action: 'read'
  }

   const callContract = useWeb3Store((state)=>(state.callContract))

  const handleCall = async()=>{
    const res = await callContract(contractInfo, callInfo)
    setAnswer(res)
  }

  return (
    <div  className={s.container}>
      <button onClick={handleCall} >Call Contract</button>
      <div> { answer } </div>
      {/* <div> transaction status: { status } </div> */}
    </div>
  )
}

export default ContractCall


//Write Smart Contract example:

export const WriteCall = () => {

  const [status, setStatus] = useState('')

  const contractInfo: ContractInfo = {
    address:'any contract address',
    abi: [
        "function name() view returns (string)",
        "function approve(address spender, uint256 amount)"
      ]
  }

  const callInfo: CallInfo = {
    name: 'approve',
    params: ['some param', 'second param'],
    action: 'write'
  }

  const callContract = useWeb3Store((state)=>(state.callContract))

  return (
    <div  className={s.container}>
      <button onClick={()=>callContract(contractInfo, callInfo, setStatus)} >Write Contract</button>
      <div> transaction status: { status } </div>
    </div>
  )
}