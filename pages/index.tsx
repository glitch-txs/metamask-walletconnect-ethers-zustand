import { UniversalProvider } from '@walletconnect/universal-provider';
import { Web3Modal } from '@web3modal/standalone'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { connectToMetamask } from '../utils/metamask/connectMetamask';
import { metamaskInit } from '../utils/metamask/metamaskInit';


export default function HomePage() {

  // const interact = async()=>{

  //   const contractAddress = '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'

  //   const ERC20Abi = [
  //     // Some details about the token
  //     "function name() view returns (string)",
  //     "function symbol() view returns (string)",
    
  //     // Get the account balance
  //     "function balanceOf(address) view returns (uint)",
    
  //     // Send some of your tokens to someone else
  //     "function transfer(address to, uint amount)",
    
  //     // An event triggered whenever anyone transfers to someone else
  //     "function approve(address spender, uint256 amount)"
  //   ];

  //   const signer = parentProvider.getSigner()
  //   const erc20Contract = new ethers.Contract(contractAddress, ERC20Abi, signer)

  //   const name = await erc20Contract.approve('0x09aed962670a8CfcB1F40a2B40C877531Ef8C04g', 1).catch((e: any)=> {
  //     if(e.code == 5000) console.log('user rejected transaction')
  //     console.log(e)
  //   })


  // }

  useEffect(()=>{
    metamaskInit()
  },[])

  return (
    <>
    <button onClick={()=>{}}>Connect Wallet</button>
    <button onClick={connectToMetamask}>Connect Metamask</button>
    <button >Bye Wallet</button>
    </>
  )
}