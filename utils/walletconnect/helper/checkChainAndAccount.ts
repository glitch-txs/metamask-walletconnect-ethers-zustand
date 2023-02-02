import { ethers } from "ethers"
import { useWeb3Store } from "../../../store/web3store"

export const checkChainAndAccount = async (provider: any)=>{

    const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()

    const address = await signer.getAddress()

    console.log('WC: user account ',address)

    useWeb3Store.setState({ userAccount: address })

    const chainId = await signer.getChainId()

    const hexChain = ethers.utils.hexValue(chainId)

    useWeb3Store.setState({ chainId: hexChain })

    console.log(`WC: chain id - ${chainId}`)
}