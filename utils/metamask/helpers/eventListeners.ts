import { checkAccountAndChainId } from "./checkAccountAndChain"
import { useWeb3Store } from '../../../store/web3store'
import { checkMetamask } from "./checkMetamask"

type ConnectInfo = {
    chainId: string
}

//Init Metamask API event listeners
export const eventListeners = (provider: any)=>{
    provider.on("accountsChanged", (accounts: string[]) => {
        if(typeof accounts[0] !== 'undefined'){
            useWeb3Store.setState({ userAccount: accounts[0]})
            console.log('user changed address to: ', accounts[0])
          }else{
            useWeb3Store.setState({ userAccount: ''})
            console.log('user is has disconnect')
          }
    });

    provider.on("chainChanged", (chainId: string) => {
        if(chainId != '0x38'){
            useWeb3Store.setState({ chainId: false })
            console.log('invalid chain id')
        }else if(chainId == '0x38'){
            useWeb3Store.setState({ chainId: true })
            console.log('valid chain id')
        }
    });

    provider.on('connect', (connectInfo: ConnectInfo)=>{
        const provider = checkMetamask()
        checkAccountAndChainId(provider)
        useWeb3Store.setState({ isProvider: true })
        console.log('provider is connected in:', connectInfo.chainId)
    });

    provider.on('disconnect', (err: any)=>{
        useWeb3Store.setState({ isProvider: false })
        console.log('the provider is desconnected from blockchain, refresh the dapp and check your internet connection')
        console.error(err)
    });
}