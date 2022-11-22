import React, {useContext, useState, useEffect} from 'react'
import Slider from '@mui/material/Slider';
import Appselect from '../../../../../components/Select/Select'
import { StoreContext } from '../../../../../../ContextAPI';
import PokeBtn from '../../../../../components/Button/PokeBtn';

const Filterbar = ({startEnd, setStartEnd, order, setOrder, dimension, setDimension, listView, setListView}) => {
  const [staEnd, setStaEnd] = useState({sta: order === 'dsc'?898 - startEnd.start:startEnd.start, end: order === 'dsc'?898 - startEnd.end:startEnd.end})
  const handleStartEnd = () => {
    setStartEnd({start: staEnd.sta, end: staEnd.end})
  } 
  const {setSearchResult} = useContext(StoreContext)
  
  useEffect(()=> {
    setStaEnd({sta: startEnd.start, end: startEnd.end})
  }, [startEnd])
  
  return (
    <div className="filterbar flexcol">
        <div className="upperbar flexrow sb">
          <Appselect value={order} setValue={setOrder} options={[{text: 'Ascending', value: 'asc', icon: 'fad fa-sort-up'}, {text: 'Descending', value: 'dsc', icon: 'fad fa-sort-down'}]} defaultOption={{icon: 'fal fa-chevron-down', text: 'Order'}} className='transparent'/>
          <div className="startendids flexrow">
           <div className="start">
              <span>From</span>
              <input className='outlined amount' type='number' value={staEnd.sta} onChange={e=> setStaEnd({...staEnd, sta: e.target.value})}/>
           </div>
           <div className="start end">
              <span>To</span>
              <input className='outlined amount' type='number' value={staEnd.end}  onChange={e=> setStaEnd({...staEnd, end: e.target.value})}/>
           </div>
           <PokeBtn isRelative handleClick={()=> handleStartEnd()}/>
          </div>
      </div>
      <div className="clearhistory flexrow" >
        <div className="range flexcol">
          <div>
            <i className='fal fa-sort-size-up-alt'></i>
            <span>Dimension</span>
          </div>
          <Slider size='small'  onChange={e=> setDimension({...dimension, value: e.target.value})}  defaultValue={dimension.value} aria-label="Default" valueLabelDisplay="auto" />
        </div>
        <div className="clearhistorybtn" onClick={()=> setSearchResult([])}>Clear history</div>
      </div>
      <div className="listview">
        <Appselect value={listView} setValue={setListView} options={[{text: 'Icons', value: 'icons', icon: 'fal fa-cube'}, {text: 'List', value: 'list', icon: 'fal fa-list'}]} defaultOption={{icon: 'fal fa-chevron-down', text: 'List view'}} />
      </div>
    </div>
  )
}
export default Filterbar