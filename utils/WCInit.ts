import { UniversalProvider } from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";

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
  });
  
  provider.on("display_uri", async (uri: any) => {
    web3Modal?.openModal({ uri });
  });
  
  provider.on("session_ping", (e: any) => {
    console.log("session_ping",e);
  });
      
  provider.on("session_event", (e: any) => {
    console.log("session_event",e);
  });
  
  provider.on("session_request", (event: any) => {
    // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.
    console.log('session request event listener:',event)
  });
  
  provider.on("session_update", (e: any) => {
    console.log("session_update",e);
  });
  
  provider.on("session_delete", () => {
    console.log("session ended");
    window.localStorage.clear()
  });

  console.log('Walletconnect has initialized')

  return provider
}