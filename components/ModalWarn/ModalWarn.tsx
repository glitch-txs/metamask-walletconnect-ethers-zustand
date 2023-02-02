import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import style from './ModalWarn.module.css'
import { useWeb3Store } from '../../store/web3store'
import Connect from './modalCases/Connect'
import Provider from './modalCases/Provider'
import Chain from './modalCases/Chain'
import Image from 'next/image'
import warn from '../../public/warning.png'
import cross from '../../public/cancel.png'

type Props = {
  setModal: (modal: boolean)=>void
}

const ModalWarn = ({setModal}: Props) => {

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
                      <Image className={style.warnIcon} src={warn} width={50} alt='!'/>
                      <div onClick={clearModal} >
                        <Image className={style.crossIcon} src={cross} width={30} alt='x'/>
                      </div>
                      {(()=>{
                      switch(modalState){
                        case 'connect': return <Connect setModal={setModal} clearModal={clearModal} />
                        case 'provider': return <Provider clearModal={clearModal} />
                        default: return <Chain modalState={modalState} />
                      }
                      })()}

                    </div>
                </div>
                </> 
                , document.getElementById('modalWarn') as HTMLDivElement) 
                : null;
}

export default ModalWarn