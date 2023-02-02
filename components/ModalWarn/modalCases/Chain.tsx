import React from 'react'
import s from './case.module.css'

type Props = {
  modalState: string
}

const Chain = ({ modalState}: Props) => {

  return (
    <div className={s.container}>
      <div className={s.title} >Wrong Chain Id</div>
      <div className={s.description} >Please Switch to the {modalState} Network.</div>
    </div>
  )
}

export default Chain