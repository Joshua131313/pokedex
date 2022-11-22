import React from 'react'
import Appselect from './Select'

const Listview = ({setListView, listView}) => {

  return (
    <div className="listview">
      <Appselect value={listView} setValue={setListView} options={[{text: 'Icons', value: 'icons', icon: 'fal fa-cube'}, {text: 'List', value: 'list', icon: 'fal fa-list'}]} defaultOption={{icon: 'fal fa-chevron-down', text: 'List view'}} />
    </div>
  )
}
export default Listview