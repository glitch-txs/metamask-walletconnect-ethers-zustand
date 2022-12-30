import React, { useState } from 'react'
import Modal from '../Modal/Modal'

type Props = {}

const Connect = (props: Props) => {

  const [modal, setModal] = useState<boolean>(false)
  
  return (
    <Modal modal={modal} setModal={setModal} >
      MODAL HEHE
    </Modal>
  )
}

export default Connect