import { useWeb3Store } from '../../../store/web3store'

//Check account and chain id and Save them in the Zustand store:
export const checkAccountAndChainId = async(provider: any)=>{

  await provider.request({ method: 'eth_accounts' })
  .then(async (accounts: string[])=>{
    if(typeof accounts[0] !== 'undefined'){
    useWeb3Store.setState({ userAccount: accounts[0]})
      console.log('Trust Wallet: user is connected as: ', accounts[0])
    }else{
      useWeb3Store.setState({ userAccount: ''})
      console.log('Trust Wallet: user is not connected')
    }
  
    //if there's an account then the user is connected to a specific chain
    await provider.request({ method: 'eth_chainId' }).then((chainId: any)=> {

    useWeb3Store.setState({ chainId: Number(chainId) })
    console.log('Trust Wallet: chain id - ', Number(chainId))
    
    })
  })
}