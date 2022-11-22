import React from 'react'

const PokeBtn = (props) => {
  const {handleClick, searchLoading=false, className, isRelative} = props
  return (
    <div className={`pokebtn ${className} ${isRelative?'pokebtnrelative':''}`} onClick={() => handleClick()}>
      {searchLoading ? (
        <i class="fas fa-circle-notch fa-spin"></i>
      ) : (
        <img src="https://i.imgur.com/snG6Fa8.png" alt=''/>
      )}
     </div>
  )
}
export default PokeBtn