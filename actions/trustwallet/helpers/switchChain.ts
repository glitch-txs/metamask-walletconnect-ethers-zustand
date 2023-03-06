import { getTrustWalletInjectedProvider } from "./getTrustProvider";

export const switchChain = async (chainId: string) => {
  //Chain Id must be Hex number
  const injectedProvider = await getTrustWalletInjectedProvider()
    try {
      if(injectedProvider != null)
      await injectedProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (e: any) {
      if (e.code === 4001) {
        console.log("User rejected switching chains.")
      } else {
        console.error(e)
      }
    }
  }