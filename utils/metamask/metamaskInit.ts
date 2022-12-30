import { checkAccountAndChainId } from "./helpers/checkAccountAndChain"
import { checkMetamask } from "./helpers/checkMetamask"
import { eventListeners } from "./helpers/eventListeners"

export const metamaskInit = ()=>{
    const provider = checkMetamask()
    if (Boolean(provider)){
        eventListeners(provider)
        checkAccountAndChainId(provider)
        
        return provider
    }
}