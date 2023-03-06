import { checkAccountAndChainId } from "./helpers/checkAccountAndChainId"
import { eventListeners, removeTrustWalletListeners } from "./helpers/eventListeners"
import { getTrustWalletInjectedProvider } from "./helpers/getTrustProvider"

export const TrustInit = async()=>{

    const provider = await getTrustWalletInjectedProvider()

    if (Boolean(provider)){
        //prevent duplicates on event listeners when restarting
        removeTrustWalletListeners(provider)
        
        eventListeners(provider)
        await checkAccountAndChainId(provider)
    }
    
    return provider
}