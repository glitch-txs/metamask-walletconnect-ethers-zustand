import { ethers } from "ethers"
import { useWeb3Store } from "../../../store/web3store"

export const checkChainAndAccount = async (provider: any)=>{

    const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()

    const address = await signer.getAddress()

    console.log('WC: user account ',address)

    useWeb3Store.setState({ userAccount: address })

    const chainId = await signer.getChainId()

    if(chainId != 56){
        useWeb3Store.setState({ chainId: false })
        console.log('WC: invalid chain id')
    }else if(chainId == 56){
        useWeb3Store.setState({ chainId: true })
        console.log('WC: valid chain id')
    }
}