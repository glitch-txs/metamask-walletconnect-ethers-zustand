import { web3Modal } from "./WCInit";
import { useWeb3Store } from '../../store/web3store'

export const openWCModal = async()=> {
  let approved = false

  const childProvider = useWeb3Store.getState().childProvider

  await childProvider?.connect({
    namespaces: {
      eip155: {
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        chains: ["eip155:56"],
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {
          56: 'https://bsc-dataseed1.binance.org/',
        },
      },
    },
  }).then((e: any)=> approved = true).catch((e: any)=> console.log(e))

  web3Modal?.closeModal();

  return approved
}