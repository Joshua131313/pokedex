import React from 'react'
import useGetItemDetails from '../../services/GetItemDetails'

const Item = (props) => {
  const {item} = props
  const itemDetails = useGetItemDetails({item}) 
  return (
    <div className="itemimg">
      <img src={itemDetails?.sprites?.default} alt=""/>
    </div>
  )
}
export default Item