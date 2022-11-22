import React from 'react'

const GenerationImages = (props) => {
  const {generation, objKey} = props
  console.log(generation[objKey])
  // const imgrow = Object.keys(generation).map(el=> {
  //   console.log(el)
  // })

  return (
    <div className="generationimages">
    
    </div>
  )
}
export default GenerationImages