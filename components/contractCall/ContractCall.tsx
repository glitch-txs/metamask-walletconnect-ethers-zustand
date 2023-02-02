import React, { useState } from 'react'
import s from './ContractCall.module.css'
import { CallInfo, ContractInfo, useWeb3Store } from '../../store/web3store'
import { networks } from '../../utils/networks'

const ContractCall = () => {

  const [answer, setAnswer] = useState()

  const contractInfo: ContractInfo = {
    address:'0x33132493DBfA4072D4655fe3f8238cbB940FaC4a',
    abi: [
        "function name() view returns (string)",
        "function approve(address spender, uint256 amount)"
      ],
      network: networks.Mainnet
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
      ],
      network: networks.Polygon
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