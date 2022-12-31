import React from 'react'
import s from './case.module.css'

type Props = {
  clearModal: ()=>void
}

const Chain = ({clearModal}: Props) => {

  // const handleSwitch = ()=>{
  //   clearModal()

  // }

  return (
    <div className={s.container}>
      <div className={s.title} >Wrong Chain Id</div>
      <div className={s.description} >Please Switch to the Correct Blockchain Network.</div>
      <div></div>
      {/* <button onClick={handleSwitch} >Connect</button> */}
    </div>
  )
}

export default Chain