import { checkAccountAndChainId } from "./helpers/checkAccountAndChainId";
import { getTrustWalletInjectedProvider } from "./helpers/getTrustProvider";

export const TrustConnect = async()=>{
    window.localStorage.clear()

    const provider = await getTrustWalletInjectedProvider()

    if(Boolean(provider)){

        const requestConnection = async ()=>{
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

        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
        }).then(requestConnection)
        .catch((er: any)=>{
          requestConnection()
          console.error("Metamask: user rejected the add new chain request",er)
        })
    }

    return provider
}