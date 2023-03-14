import React from 'react'
import { useWeb3Store } from '../store/web3store'

const useAccount = () => {

    const userAddress = useWeb3Store((state)=> state.userAccount)

  return { userAddress }
}

export default useAccount