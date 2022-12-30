import { ethers } from 'ethers'
import create from 'zustand'
import { connectToMetamask } from '../utils/metamask/connectMetamask'
import { removeEventsMetamask } from '../utils/metamask/helpers/eventListeners'
import { metamaskInit } from '../utils/metamask/metamaskInit'
import { openWCModal } from '../utils/WCConnect'
import { WCInit } from '../utils/WCInit'

//WC stands for Walletconnect

interface Web3Store {
    //We need a time for the WC init to load
    isConnecting: boolean
    // Modal will trigger the modal and show specific warning depending on the web3 states status.
    modal: '' | 'provider' | 'chain' | 'connect'
    isProvider: boolean
    userAccount: string
    chainId: boolean
    Provider: any
    childProvider: any

    web3Init: ()=> void
    connectMetamask: ()=> void
    connectWC: ()=> void
    disconnectWC: ()=> void
    callContract: (contractInfo: ContractInfo, params: any[], setStatus?: (status: string)=> void)=> void
}

type ContractInfo = {
    address: string
    abi: any[]

    //function name
    call: string
}

export const useWeb3Store = create<Web3Store>()((set, get) => ({
    isConnecting: true,
    modal: '',
    isProvider: true,
    userAccount: '',
    chainId: false,
    Provider: null,
    childProvider: null,

    web3Init: async()=> {
        const WCProvider_ = await WCInit()
        set((state)=>({childProvider: WCProvider_}))

        const metamaskProvider = await metamaskInit()
        if(get().userAccount != ''){
            set((state)=>({childProvider: metamaskProvider}))
        }

        set((state)=>({isConnecting: false}))
        
        return ()=> removeEventsMetamask(metamaskProvider)
    },

    connectMetamask: async()=>{
        const connectedProvider = await connectToMetamask()
        set((state)=>({childProvider: connectedProvider}))
    },

    //Connect to walletconnet, popups QR modal
    connectWC: async()=>{
        const userConnected = await openWCModal()

        //If the user refects the connection userConnected is going to be false, to prevent errors when init provider.
        if(userConnected){
            const web3Provider = new ethers.providers.Web3Provider(get().childProvider)
            const signer = web3Provider.getSigner()
    
            const address = await signer.getAddress()
            set((state)=>({userAccount: address}))
    
            const chainId = await signer.getChainId()
    
            if(chainId != 56){
                set((state)=>({ chainId: false }))
                console.log('invalid chain id')
            }else if(chainId == 56){
                set((state)=>({ chainId: true }))
                console.log('valid chain id')
            }
        }
    },

    disconnectWC: ()=> {
        get().childProvider?.disconnect()
    },

    callContract: async(contractInfo: ContractInfo, params: any[] = [], setStatus?: (status: '' | 'pending' | 'success' | 'error')=> void)=> {

        if(!get().isProvider && get().Provider != null){
            set((state)=>({ modal: 'provider' }))
        }else if(get().userAccount == ''){
            set((state)=>({ modal: 'connect' }))
        }else if(!get().chainId){
            set((state)=>({ modal: 'chain' }))
        }else if(get().childProvider != null){

            const web3Provider = new ethers.providers.Web3Provider(get().childProvider)
            const signer = web3Provider.getSigner()

            const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer)
            setStatus?.('pending')
            await contract[contractInfo.call](...params)
            .then((res: ethers.ContractTransaction) => web3Provider.once(res.hash, ()=> setStatus?.('success')))
            .catch((e: any)=> {
                console.log(e)
                setStatus?.('error')
            })

            setTimeout(()=>setStatus?.(''),2000)
        }
    },
}))