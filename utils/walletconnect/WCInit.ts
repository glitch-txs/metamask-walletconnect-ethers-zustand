import { UniversalProvider } from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";
import { useWeb3Store } from "../../store/web3store";
import { checkChainAndAccount } from "./helper/checkChainAndAccount";

export const web3Modal = new Web3Modal({ 
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID 
})
  
web3Modal.setTheme({
  themeMode: "light",
  themeColor: "blackWhite",
  themeBackground: "gradient",
});

export const WCInit = async()=> {
  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
  }

  const provider = await UniversalProvider.init({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    metadata: {
      name: "Glitch Dapp",
      description: "Glitch Dapp",
      url: "mywebsite.com",
      icons: ["https://lh3.googleusercontent.com/ogw/AOh-ky0c2alK5GAwefGWkwQHVpcJR637KRzHSZx9dV31rg=s32-c-mo"],
    },
    //This catch is agressive, as it prevents the use of Metamask if WC failed to connect
  }).catch( e=> useWeb3Store.setState({isProvider: false}) );
  
  provider?.on("display_uri", async (uri: any) => {
    web3Modal?.openModal({ uri });
  });
  
  provider?.on("session_ping", (e: any) => {
    console.log("WC: session_ping",e);
  });
      
  provider?.on("session_event", (e: any) => {
    console.log("WC: session_event",e);
  });
  
  provider?.on("session_request", (event: any) => {
    // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.
    console.log('WC: session request event listener:',event)
  });
  
  provider?.on("session_update", (e: any) => {
    console.log("WC: session_update",e);
  });
  
  provider?.on("session_delete", () => {
    console.log("WC: session ended");
    window.localStorage.clear()
    useWeb3Store.getState().restartWeb3()
  });
  console.log(provider?.session)
  if(provider?.session){
    checkChainAndAccount(provider)
  }

  console.log('Walletconnect has initialized')

  return provider
}