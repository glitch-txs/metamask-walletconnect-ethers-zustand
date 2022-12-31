```bach
pnpm install
```
# What's New?

- The three most important variables are managed by Zustand: User Account, Chain Id, Blockchain Provider.

### Following the MetaMask API documentation:
>You should only initiate a connection request in response to direct user action, such as clicking a button. You should always disable the "connect" button while the connection request is pending. You should never initiate a connection request on page load.

- **isConnecting** boolean variable can be called to set a loader meanwhile the user is getting connected.
 This will also will be `true` when Walletconnect is initializing.

 - User can only be connected by either MetaMask or Walletconnect but not both at the same time, as the provider is going to be overwritten.

 - If user doesn't have installed MetaMask and tries to connect, a new window will be opened for the extenstion installation.

 - When the user clicks on MetaMask to connect he will be asked to change the Network to the desired one by the Dapp, if the user doesn't have the network listed in his wallet, MetaMask will ask him if he wants to add it, and it will added automatically.

 ## Warning Modal

 - Smart Contracts (write) functions are called with a special function comming from the Zustand store. This will have a couple of security layers. If the user address is null, the chain id is incorrect or the provider is disconnected from the node, a modal will popup (and the smart contract call won't be triggered) and will ask the user to fix the issue. 

 For example, the MetaMask API docs sates the following regarding the provider connection:

 *On disconnect event listener:*
>The MetaMask provider emits this event if it becomes unable to submit RPC requests to any chain. In general, this will only happen due to network connectivity issues or some unforeseen error.
>
>Once disconnect has been emitted, the provider will not accept any new requests until the connection to the chain has been re-established, which requires reloading the page.

In this example the modal will ask the user to check his internet network and reload the website.

- If the user is connected in the right chain id, the provider is connected and the user itself is connected then the smart contract call function will be triggered. This is done by ethers.js contract instance.

- The smart contract function will also allow the developer to handle the state of the transaction: 'pending', 'success', 'error'.

TODO:
- Currently only MetaMask events are fully handled, Walletconnect's ones are not, the only WC event handled is when the user disconnects which will clear everything to the initial state.

NOTE: Metamask currently doesn't support Walletconnect v2. ETA is at the end of Q1 2023*