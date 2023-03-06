type Props = {
  address: string
  symbol: string
  decimals?: number
  image: string
}

export const addTokenRequest = async({ address, symbol, decimals = 18, image }: Props)=>{
  await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: address,
        symbol: symbol,
        decimals: decimals,
        image
      },
    },
  });
}