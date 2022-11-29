import { useState } from "react"
import Button from "../../../../../components/Button/Button"
import Appinput from "../../../../../components/Input/Input"
import Listview from "../../../../../components/Select/Listview"
import { clean } from "../../../../../utils/Functions"


 const Boxinfo = (props) => {
  const {title, placeholder, showInput, icon, limitBtn, lim=30, data, renderItem, setListView, listView} = props
  const [search, setSearch] = useState('')
  const pattern = new RegExp('\\b' + clean(search), 'i');
  const [limit, setLimit] = useState(lim)

  return (
    <div className="boxinfo">
      <h3 className='boxtitle'>
        <span>{title}</span>
        {showInput && <Appinput setValue={setSearch} value={search} icon={icon} placeholder={placeholder}/>}
      </h3>
      {listView && <Listview listView={listView} setListView={setListView}/>}
      <div className="boxcontent">
        {typeof props.children === 'function'? props?.children({
          pattern: pattern,
          limit,
        }): props.children}
      </div>
      <div className="limitbtn flexrow" style={{marginTop: 10}}>
        {limitBtn && <Button text='Load more' onClick={()=> setLimit(prev=> prev + 15)}/>}
      </div>
    </div>
  )
}
export default Boxinfo