import { listenEvents } from "./helpers/eventListeners"
import { getProvider } from "./helpers/getProvider"

export const PhInit = ()=>{

    const provider = getProvider()

    if(provider){
        //events
        listenEvents(provider)
    
        //try to connect
        provider.connect({ onlyIfTrusted: true }).then(({ publicKey }: any) => {
    
            console.log(publicKey)
    
        }).catch((err: any) => console.error(err))
    }
}