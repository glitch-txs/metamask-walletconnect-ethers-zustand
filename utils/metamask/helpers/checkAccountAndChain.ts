import { useWeb3Store } from '../../../store/web3store'

//Check account and chain id:
export const checkAccountAndChainId = async(provider: any)=>{

  await provider.request({ method: 'eth_accounts' })
  .then(async (accounts: string[])=>{
    if(typeof accounts[0] !== 'undefined'){
      useWeb3Store.setState({ userAccount: accounts[0]})
      console.log('user is connected as: ', accounts[0])
    }else{
      useWeb3Store.setState({ userAccount: ''})
      console.log('user is not connected')
    }
  
    //if there's an account then the user is connected to a specific chain
    await provider.request({ method: 'eth_chainId' }).then((chainId: any)=> {
      if(chainId != '0x38'){
        useWeb3Store.setState({ chainId: false })
        console.log('invalid chain id')
      }else if(chainId == '0x38'){
        useWeb3Store.setState({ chainId: true })
        console.log('valid chain id')
      }
    })
  })
}