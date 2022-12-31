import React from 'react'
import s from './case.module.css'

type Props = {
  clearModal: ()=>void
}

const Provider = (props: Props) => {

  const handleReload = ()=>{
    window.location.reload()
  }
  return (
    <div className={s.container}>
      <div className={s.title} >Blockchain Connection Lost</div>
      <div className={s.description} >Please, check your <b>internet connection</b> and <b>reload</b> the website</div>
      <button onClick={handleReload} >Reload</button>
    </div>
  )
}

export default Provider