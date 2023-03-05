export const addTokenRequest = (provider: any)=>{
    provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: 'tokenAddress',
            symbol: 'ABC',
            decimals: 18,
            image: 'image url of the token',
          },
        },
      });
}