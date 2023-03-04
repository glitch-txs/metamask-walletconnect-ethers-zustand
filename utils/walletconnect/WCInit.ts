import { UniversalProvider } from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";
import { useWeb3Store } from "../../store/web3store";
import { checkChainAndAccount } from "./helper/checkChainAndAccount";

export const web3Modal = new Web3Modal({ 
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  walletConnectVersion:2,
  standaloneChains:["eip155:56", "eip155:250", "eip155:137", "eip155:1", "eip155:43114"],
  explorerAllowList:[
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
    "7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26"
  ]
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