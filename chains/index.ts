import { SupportedNetworks } from "../store/web3store"

type Net = {
    name: SupportedNetworks
    hexId: string
    eipId: string
    rpcUrl: string
}

type Networks = {
    SmartChain:Net
    Fantom:Net
    Polygon:Net
    Mainnet:Net
    Avalanche:Net
}

export const networks: Networks = {
    SmartChain: {
        name: "Binance Smart Chain",
        hexId:'0x38',
        eipId:'eip155:56',
        rpcUrl:"https://bsc-dataseed1.binance.org/"
    },
    Fantom:{
        name: 'Fantom',
        hexId:'0xfa',
        eipId:'eip155:250',
        rpcUrl:"https://rpc.ankr.com/fantom/"
    },
    Polygon:{
        name: 'Polygon',
        hexId:'0x89',
        eipId:'eip155:137',
        rpcUrl:"https://polygon-rpc.com/"
    },
    Mainnet:{
        name: 'Ethereum Mainnet',
        hexId: '0x1',
        eipId:'eip155:1',
        rpcUrl:"https://eth.llamarpc.com"
    },
    Avalanche:{
        name: 'Avalanche',
        hexId:'0xa86a',
        eipId:'eip155:43114',
        rpcUrl:"https://api.avax.network/ext/bc/C/rpc"
    }
}