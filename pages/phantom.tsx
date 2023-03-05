import React, { useEffect } from 'react'
import { PhConnect, PhDisconnect } from '../actions/phantom/PhConnect'
import { PhInit } from '../actions/phantom/PhInit'

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