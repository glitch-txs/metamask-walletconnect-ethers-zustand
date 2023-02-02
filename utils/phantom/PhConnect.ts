import { getProvider } from "./helpers/getProvider";

export const PhConnect = async()=>{

    const provider = getProvider()

    try {
        const resp = await provider.connect()

        console.log("Ph connected as: ", resp.publicKey.toString())

    } catch (err) {
        console.error("Ph: Connect Error: ",err)
    }
}

export const PhDisconnect = ()=>{
    const provider = getProvider()
    provider.disconnect()
}