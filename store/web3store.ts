import { ethers } from 'ethers'
import create from 'zustand'
import { isOnMobile } from '../utils/handleMobile'
import { connectToMetamask } from '../utils/metamask/connectMetamask'
import { removeEventsMetamask } from '../utils/metamask/helpers/eventListeners'
import { metamaskInit } from '../utils/metamask/metamaskInit'
import { checkChainAndAccount } from '../utils/walletconnect/helper/checkChainAndAccount'
import { openWCModal } from '../utils/walletconnect/WCConnect'
import { WCInit } from '../utils/walletconnect/WCInit'

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
    }
}

export type CallInfo = {
    name: string
    params: any[]
    action: 'read' | 'write'
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
    chainId: string
    Provider: any
    childProvider: any

    clearModal: ()=>void

    web3Init: ()=> void
    connectMetamask: ()=> void
    connectWC: ()=> void
    disconnectWC: ()=> void
    callContract: (contractInfo: ContractInfo, callInfo: CallInfo, setStatus?: (status: string)=> void)=> any
    restartWeb3: ()=> void
}


export const useWeb3Store = create<Web3Store>()((set, get) => ({
    isLoading: true,
    modal: '',
    isProvider: true,
    WCInitFailed: false,
    isWC: false,
    userAccount: '',
    chainId: '',
    Provider: null,
    childProvider: null,

    clearModal: ()=> {set((state)=> ({ modal: '' }))},

    web3Init: async()=> {
        set((state)=>({isLoading: true}))
        
        const WCProvider_ = await WCInit()
        set((state)=>({childProvider: WCProvider_}))

        if(WCProvider_?.session) {
            set((state)=>({isWC: true}))
            return
        }

        const metamaskProvider = await metamaskInit()
        if(get().userAccount != ''){
            set((state)=>({childProvider: metamaskProvider}))
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
                window.open('ADD_DEEPLNK_URL_HERE');
            }else{
                window.open('https://metamask.io/download/', '_blank');
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

            const hexChain = ethers.utils.hexValue(chainId)

            set((state)=>({ chainId: hexChain }))
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

    callContract: async(contractInfo: ContractInfo, callInfo: CallInfo, setStatus?: (status: string)=> void)=> {

        if(!get().isProvider && get().Provider != null){
            set((state)=>({ modal: 'provider' }))
        }else if(get().userAccount == ''){
            set((state)=>({ modal: 'connect' }))
        }else if(!(get().chainId == contractInfo.network.hexId || get().isWC)){
            set((state)=>({ modal: contractInfo.network.name }))
        }else if(get().childProvider != null){

            let answer: any;

            if(get().isWC)
            get().childProvider.setDefaultChain(contractInfo.network.eipId)

            const web3Provider = new ethers.providers.Web3Provider(get().childProvider)
            const signer = web3Provider.getSigner()
            
            const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer)

            if(callInfo.action == 'read'){
                
                const res = await contract[callInfo.name](...callInfo.params)
                answer = res

            }else if(callInfo.action == 'write'){

                setStatus?.('pending')
                await contract[callInfo.name](...callInfo.params)
                .then((res: ethers.ContractTransaction) => web3Provider.once(res.hash, ()=> setStatus?.('success')))
                .catch((e: any)=> {
                    console.log(e)
                    setStatus?.('error')
                })
    
                setTimeout(()=>setStatus?.(''),2000)

            }else{
                console.log('wrong action in callInfo object')
            }
            return answer ? answer : null
        }
    },

    restartWeb3:async()=>{
        set((state)=>({isLoading: true, userAccount: '', isWC: false, Provider: null, childProvider: null}))
        window.localStorage.clear()
        get().web3Init()

        set((state)=>({isLoading: false}))
    }
}))