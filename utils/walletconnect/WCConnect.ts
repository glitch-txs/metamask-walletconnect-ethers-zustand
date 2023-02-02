import { web3Modal } from "./WCInit";
import { useWeb3Store } from '../../store/web3store'
import { networks } from "../networks";

export const openWCModal = async()=> {
  let approved = false

  const childProvider = useWeb3Store.getState().childProvider

  let chains = []

  for (const [key, value] of Object.entries(networks)){
    chains.push(value.eipId)
  }

  console.log("chains",chains)

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
        chains,
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {
          1:'https://eth.llamarpc.com',
          56: 'https://bsc-dataseed.binance.org/',
          137:'https://polygon-rpc.com',
          250:'https://rpc.ftm.tools',
          43114:'https://api.avax.network/ext/bc/C/rpc',
        }
      },
    },
  }).then((e: any)=> approved = true).catch((e: any)=> console.log(e))

  web3Modal?.closeModal();

  return approved
}