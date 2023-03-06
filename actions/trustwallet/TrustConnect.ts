import { checkAccountAndChainId } from "./helpers/checkAccountAndChainId";
import { getTrustWalletInjectedProvider } from "./helpers/getTrustProvider";

export const TrustConnect = async()=>{
    window.localStorage.clear()

    const provider = await getTrustWalletInjectedProvider()

    if(Boolean(provider)){

      await provider.request({ method: 'eth_requestAccounts' })
      .then(()=> checkAccountAndChainId(provider))
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Trust Wallet: user rejected the connection request');
        } else {
          console.error('Trust Wallet: request connection error',err);
        }
      });
    }

    return provider
}