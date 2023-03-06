import React, { useRef, useEffect } from 'react'
const ModelViewer = require('@metamask/logo');
import meshJson from './flask-fox.json'

const MetaLogo = () => {

  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    
    let widthFox = 100;

    if(typeof window != "undefined" && window.innerWidth < 360)
    widthFox = 80
    
    let heightFox = widthFox * 0.8;
    let followMouse = true;
    

    const viewer = ModelViewer({
      pxNotRatio: true,
      width: widthFox,
      height: heightFox,
      followMouse: followMouse,
      slowDrift: false,
      meshJson
    });
    

    if(metaRef && metaRef.current && metaRef.current.children.length == 0){
      metaRef.current.appendChild(viewer.container) 
    }

    return ()=> {
      if(metaRef && metaRef.current && metaRef.current.children.length > 0)
      metaRef.current.removeChild(metaRef.current.children[0])
    }

  }, [])
  
  return (
    <div style={{lineHeight:'0'}} ref={metaRef} />
  )
}

export default MetaLogo