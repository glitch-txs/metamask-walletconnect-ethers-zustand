import { SupportedNetworks } from "../store/web3store"

type Net = {
    name: SupportedNetworks
    hexId: string
    eipId: string
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
        eipId:'eip155:56'
    },
    Fantom:{
        name: 'Fantom',
        hexId:'0xfa',
        eipId:'eip155:250'
    },
    Polygon:{
        name: 'Polygon',
        hexId:'0x89',
        eipId:'eip155:137'
    },
    Mainnet:{
        name: 'Ethereum Mainnet',
        hexId: '0x1',
        eipId:'eip155:1'
    },
    Avalanche:{
        name: 'Avalanche',
        hexId:'0xa86a',
        eipId:'eip155:43114'
    }
}