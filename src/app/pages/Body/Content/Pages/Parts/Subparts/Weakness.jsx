import { determineColor } from "../../../../../../utils/Functions"

const Weakness = (props) => {
  const {weakness, setActiveType} = props

  return (
    <div className="weakness" style={{background: determineColor(weakness.type)}} onClick={()=> setActiveType?.({name: weakness.type, url: `https://pokeapi.co/api/v2/type/${weakness.type}`})}>
     {weakness.type}
    </div>
  )
}
export default Weakness