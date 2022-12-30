import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import style from './Modal.module.css'
import Image from 'next/image'


interface Props {
    modal: boolean,
    setModal: (modal: boolean)=> void,
    children: React.ReactNode,
  }

const Modal = ({ modal, setModal, children }: Props) => {

  const [mounted, setMounted] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setMounted(true)

          //Close menu when click outside the div
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

      return ()=> setMounted(false)
  }, [])
    
    
  return mounted ? 
  createPortal(
                <>        
                <div className={ modal ? style.container : style.containerClose }>
                    <div ref={modalRef} className={ modal ? style.card : style.cardClose }>
                    { children }
                    </div>
                </div>
                </> 
                , document.getElementById('modal') as HTMLDivElement) 
                : null;
}

export default Modal