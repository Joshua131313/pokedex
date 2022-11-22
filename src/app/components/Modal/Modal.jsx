import React, { useEffect, useState } from 'react'
import './Modal.css'
const Modal = (props) => {
  const {className, modal, setModal} = props

  useEffect(()=> {
    if(modal) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'initial'
    }
  }, [modal])
  return (
    <div className={`modalcont ${modal ? 'activemodalcont' : ''}`}>
        <div className="modal">
          <img src="https://i.imgur.com/9vjciKz.png" alt=""/>
          {props.children}
        </div>
    </div>
  )

}
export default Modal
