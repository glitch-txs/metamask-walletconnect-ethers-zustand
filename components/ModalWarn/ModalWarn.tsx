import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import style from './Modal.module.css'
import { useWeb3Store } from '../../store/web3store'
import Connect from './modalCases/Connect'
import Provider from './modalCases/Provider'
import Chain from './modalCases/Chain'

const ModalWarn = () => {

  const [mounted, setMounted] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null);

  const modalState = useWeb3Store((state)=>state.modal)
  const clearModal = useWeb3Store((state)=>state.clearModal)

  useEffect(() => {
      setMounted(true)

          //Close menu when click outside the div
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        clearModal()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

      return ()=> setMounted(false)
  }, [])
    
  return mounted ? 
  createPortal(
                <>        
                <div className={ modalState != '' ? style.container : style.containerClose }>
                    <div ref={modalRef} className={ modalState != '' ? style.card : style.cardClose }>

                      {(()=>{
                      switch(modalState){
                        case 'connect': return <Connect/>
                        case 'provider': return <Provider/>
                        case 'chain': return <Chain/>
                      }
                      })()}

                    </div>
                </div>
                </> 
                , document.getElementById('modalWarn') as HTMLDivElement) 
                : null;
}

export default ModalWarn