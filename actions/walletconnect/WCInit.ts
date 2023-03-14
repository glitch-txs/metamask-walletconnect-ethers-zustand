import { UniversalProvider } from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";
import { useWeb3Store } from "../../store/web3store";
import { checkChainAndAccount } from "./helper/checkChainAndAccount";

export const web3Modal = new Web3Modal({ 
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  walletConnectVersion:2,
  standaloneChains:["eip155:56", "eip155:250", "eip155:137", "eip155:1", "eip155:43114"],
  themeZIndex:99999
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
      name: document.title,
      description: document?.querySelector('meta[name="description"]')?.textContent ? 
      document.querySelector('meta[name="description"]')?.textContent as string : "",
      url: `${window.location.href}`,
      icons: [`${window.location.href}favicon.ico`],
    },
  }).catch( e=> {
    console.log("WC Init error: ",e)
    useWeb3Store.setState({WCInitFailed: true})
   });
  
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