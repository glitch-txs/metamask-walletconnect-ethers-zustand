declare global{
  interface Window {
    ethereum?: any;
  }
}

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
    }else{
        console.log('Onboarding to install Metamask')
        return false
    }
  }
}