import { ethers } from 'ethers'
import { create } from 'zustand'
import { isOnMobile } from '../utils/handleMobile'
import { connectToMetamask } from '../actions/metamask/connectMetamask'
import { removeEventsMetamask } from '../actions/metamask/helpers/eventListeners'
import { metamaskInit } from '../actions/metamask/metamaskInit'
import { openWCModal } from '../actions/walletconnect/WCConnect'
import { WCInit } from '../actions/walletconnect/WCInit'
import { TrustConnect } from '../actions/trustwallet/TrustConnect'
import { TrustInit } from '../actions/trustwallet/TrustInit'

//WC stands for Walletconnect

//True if user is on mobile
const mobile = isOnMobile()

export type SupportedNetworks = "Binance Smart Chain" | 'Fantom' | 'Polygon' | 'Ethereum Mainnet' | 'Avalanche'

export type ContractInfo = {
    address: string
    abi: any
    network: {
        name: SupportedNetworks
        hexId: string
        eipId: string
        rpcUrl: string
    }
}

export type CallInfo = {
    name: string
    params: any[]
}

interface Web3Store {
    //We need a time for the WC init to load
    isLoading: boolean
    // Modal will trigger the modal and show specific warning depending on the web3 states status.
    modal: '' | 'provider' | SupportedNetworks | 'connect'
    isProvider: boolean
    //if WC connect init fails to connect this will be false
    WCInitFailed: boolean
    isWC: boolean
    userAccount: string
    chainId: number
    Provider: any
    childProvider: any
    emergencyProviderWC: any

    clearModal: ()=>void

    web3Init: ()=> void
    connectMetamask: ()=> void
    connectTrustWallet: ()=> void
    connectWC: ()=> void
    disconnectWC: ()=> void
    writeContract: (contractInfo: ContractInfo, callInfo: CallInfo, setStatus?: (status: string)=> void)=> any
    readContract: (contractInfo: ContractInfo, callInfo: CallInfo)=> any
    restartWeb3: ()=> void
}


export const useWeb3Store = create<Web3Store>()((set, get) => ({
    isLoading: true,
    modal: '',
    isProvider: true,
    WCInitFailed: false,
    isWC: false,
    userAccount: '',
    chainId: 0,
    Provider: null,
    childProvider: null,
    emergencyProviderWC: null,

    clearModal: ()=> {set((state)=> ({ modal: '' }))},

    web3Init: async()=> {
        set((state)=>({isLoading: true}))
        
        const WCProvider_ = await WCInit()
        set((state)=>({childProvider: WCProvider_}))

        //used to check WC sessions when there are other wallets' interactions happening
        set((state)=>({emergencyProviderWC: WCProvider_}))

        if(WCProvider_?.session) {
            set((state)=>({isWC: true}))
            set((state)=>({isLoading: false}))
            return
        }

        const metamaskProvider = await metamaskInit()
        if(get().userAccount != ''){
            set((state)=>({childProvider: metamaskProvider}))
            set((state)=>({isLoading: false}))
            return
        }

        const trustWalletProvider = await TrustInit()
        if(get().userAccount != ''){
            set((state)=>({childProvider: trustWalletProvider}))
        }

        set((state)=>({isLoading: false}))
        
        return ()=> removeEventsMetamask(metamaskProvider)
    },

    connectMetamask: async()=>{
        set((state)=>({isLoading: true}))
        const connectedProvider = await connectToMetamask()

        //if userAccount == '' it means the user rejected the connection 
        if(get().userAccount != '' && Boolean(connectedProvider)){
            set((state)=>({isWC: false}))
            set((state)=>({childProvider: connectedProvider}))
        } else if(!connectedProvider){
            //If metamask is not installed then it will open this link to install the extention. (Deeplink)
            if(mobile){
                window.open('https://metamask.app.link/dapp/metamask-walletconnect-ethers-zustand.vercel.app/');
            }else{
                window.open('https://metamask.io/download/', '_blank');
            }
        }
        
        set((state)=>({isLoading: false}))
    },

    connectTrustWallet: async()=>{
        set((state)=>({isLoading: true}))
        const connectedProvider = await TrustConnect()

        //if userAccount == '' it means the user rejected the connection 
        if(get().userAccount != '' && Boolean(connectedProvider)){
            set((state)=>({isWC: false}))
            set((state)=>({childProvider: connectedProvider}))
        } else if(!connectedProvider){
            //If Trust Wallet is not installed then it will open this link to install the extention. (Deeplink)
            if(mobile){
                window.open('https://link.trustwallet.com/open_url?coin_id=60&url=https://metamask-walletconnect-ethers-zustand.vercel.app/');
            }else{
                window.open('https://trustwallet.com/browser-extension/', '_blank');
            }
        }
        
        set((state)=>({isLoading: false}))
    },

    //Connect to walletconnet, popups QR modal
    connectWC: async()=>{

        if(get().WCInitFailed){
            //If WCinit failed to load user will need to reload the website to connect
            set((state)=>({ modal: 'provider' }))
            return
        }

        const userConnected = await openWCModal()

        //If the user refects the connection userConnected is going to be false, to prevent errors when init provider.
        if(userConnected){
            set((state)=>({isWC: true}))

            const web3Provider = new ethers.providers.Web3Provider(get().childProvider)
            const signer = web3Provider.getSigner()
    
            const address = await signer.getAddress()
            set((state)=>({userAccount: address}))
    
            const chainId = await signer.getChainId()

            set((state)=>({ chainId: chainId }))
        }
    },

    disconnectWC: async ()=> {
        set((state)=>({isLoading: true}))
        //check if there's a session in Walletconnect
        if(get().childProvider && get().childProvider.session){
            await get().childProvider?.disconnect()
            get().restartWeb3()
        }
        set((state)=>({isLoading: false}))
    },

    writeContract: async(contractInfo: ContractInfo, callInfo: CallInfo, setStatus?: (status: string)=> void)=> {

        if(!get().isProvider && get().Provider != null){
            set((state)=>({ modal: 'provider' }))
        }else if(get().userAccount == ''){
            set((state)=>({ modal: 'connect' }))
        }else if(!(get().chainId == Number(contractInfo.network.hexId) || get().isWC)){
            set((state)=>({ modal: contractInfo.network.name }))
        }else if(get().childProvider != null){

            let answer: any;

            if(get().isWC)
            get().childProvider.setDefaultChain(contractInfo.network.eipId)

            const web3Provider = new ethers.providers.Web3Provider(get().childProvider)
            const signer = web3Provider.getSigner()
            
            const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer)

            setStatus?.('pending')
            await contract[callInfo.name](...callInfo.params)
            .then((res: ethers.ContractTransaction) => web3Provider.once(res.hash, ()=> setStatus?.('success')))
            .catch((e: any)=> {
                console.log(e)
                setStatus?.('error')
            })
    
            setTimeout(()=>setStatus?.(''),2000)

        }
    },

    readContract: async(contractInfo: ContractInfo, callInfo: CallInfo) => {

        const rpcProvider = new ethers.providers.JsonRpcProvider(contractInfo.network.rpcUrl)
        
        const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, rpcProvider)

        const res = await contract[callInfo.name](...callInfo.params)

        return res
    },

    restartWeb3:async()=>{
        set((state)=>({isLoading: true, userAccount: '', isWC: false, Provider: null, childProvider: null}))
        console.log("web3 state restarted")
        get().disconnectWC()
        window.localStorage.clear()
        get().web3Init()

        set((state)=>({isLoading: false}))
    }
}))