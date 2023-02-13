import { isOnMobile } from "../../handleMobile"

declare global{
  interface Window {
    ethereum?: any;
  }
}

//True if user is on mobile
const mobile = isOnMobile()

//Check if there's Metamask provider, on mobile or needs to install metamask
//If MM Provider exists then returns it
export const checkMetamask = ()=>{
  if(typeof window != 'undefined'){
    if(window.ethereum){

      //Check it's not coinbase wallet provider:
      let provider = window.ethereum;
      // edge case if MM and CBW are both installed
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p: any) => {
          if (p.isMetaMask) provider = p;
        });
      }

      return provider
    }
    else if(mobile){
        // Hide on mobile, it can be connected with Walletconnect.
        window.open('https://metamask.app.link/dapp/seedify.fund/', '_blank')
        return false
    }else{
        window.open('https://https://metamask.io/download/', '_blank')
        return false
    }
  }
}