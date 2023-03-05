import { checkAccountAndChainId } from "./helpers/checkAccountAndChain"
import { checkMetamask } from "./helpers/checkMetamask"
import { eventListeners, removeEventsMetamask } from "./helpers/eventListeners"

export const metamaskInit = async ()=>{
    const provider = checkMetamask()
    if (Boolean(provider)){
        //prevent duplicates on event listeners when restarting
        removeEventsMetamask(provider)
        
        eventListeners(provider)
        await checkAccountAndChainId(provider)
    }
    
    return provider
}