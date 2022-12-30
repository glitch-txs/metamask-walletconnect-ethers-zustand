import React, { useRef, useEffect } from 'react'
import { isMobile } from '../../../../utils/handleMobile';
const ModelViewer = require('@metamask/logo');
import meshJson from './fade-fox.json'

const MetaLogo = () => {

  const metaRef = useRef<HTMLDivElement>(null)

  const mobile = isMobile()

  useEffect(() => {

    let widthFox = 500;
    let heightFox = 400;
    let followMouse = true;

    if(mobile){
      widthFox = 300
      heightFox = 300
      followMouse = false;
    }

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


  }, [])
  
  return (
    <div ref={metaRef} />
  )
}

export default MetaLogo