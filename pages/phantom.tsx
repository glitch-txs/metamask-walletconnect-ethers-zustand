import React, { useEffect } from 'react'
import { PhConnect, PhDisconnect } from '../utils/phantom/PhConnect'
import { PhInit } from '../utils/phantom/PhInit'

const phantom = () => {
    useEffect(()=>{
        PhInit()
    },[])

  return (
    <div>phantom
        <button onClick={PhConnect} >Connect</button>
        <button onClick={PhDisconnect} >Disconnect</button>
    </div>
  )
}

export default phantom