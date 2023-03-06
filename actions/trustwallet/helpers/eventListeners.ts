import { useWeb3Store } from "../../../store/web3store"

const handleChain = (chainId: string | number)=>{
  useWeb3Store.setState({ chainId: Number(chainId) })
  console.log("Trust Wallet: user chain id: ", Number(chainId))
}

const handleAccount = (accounts: string[])=>{
  if(typeof accounts[0] !== 'undefined'){
    useWeb3Store.getState().disconnectWC()
    useWeb3Store.setState({ userAccount: accounts[0]})
      console.log('Trust Wallet: user is connected as: ', accounts[0])
    }else{
      useWeb3Store.getState().restartWeb3()
      console.log('Trust Wallet: user is not connected')
    }
}

const handleDisconnect = (e: any)=>{
  useWeb3Store.getState().restartWeb3()
  console.log("Trust Wallet: User has disconnected")
}

export const eventListeners = (injectedProvider: any)=>{
    injectedProvider.addListener("chainChanged", handleChain);

    injectedProvider.addListener("accountsChanged", handleAccount);
    
    injectedProvider.addListener("disconnect", handleDisconnect);
}

export const removeTrustWalletListeners = (injectedProvider: any)=>{
  injectedProvider.removeListener("chainChanged", handleChain);

  injectedProvider.removeListener("accountsChanged", handleAccount);
  
  injectedProvider.removeListener("disconnect", handleDisconnect);
}