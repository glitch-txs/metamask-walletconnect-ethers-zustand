import { getProvider } from "./getProvider";

export const listenEvents = (provider: any)=>{
    provider.on("connect", (publicKey: any) => {
        console.log("Ph: Connected as ", publicKey.toString());
    });

    provider.on("disconnect", () => {
        console.log("Ph: disconnected");
    });

    provider.on('accountChanged', (publicKey: any) => {
        if (publicKey) {
          console.log(`Ph: Switched to account ${publicKey.toBase58()}`);
        } else {
          provider.connect().catch((error: any) => {
            console.error("Ph: account changed event error",error)
          });
        }
    });
}