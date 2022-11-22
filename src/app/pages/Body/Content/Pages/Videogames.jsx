import axios from "axios";
import React, {useState} from "react";
import Loadmorecont from "../../../../components/Loadmorecont";
import Videogame from "../../../../components/Videogame/Videogame";
import useGetVideoGames from "../../../../services/Videogames/GetVideoGames";

const Videogames = () => {
  const [fetchMore, setFetchMore] = useState(false)

  const {videoGames, length} = useGetVideoGames({limit: 15, fetchMore, setFetchMore})
  const videogamesrow = videoGames?.filter(x=> x.name !== 'xd' && x.name !== 'colosseum').map(videogame=> {
    return (
      <Videogame videogame={videogame}/>
    ) 
  })


  return (
    <div className="videogamespage pokedexpage page">
      <div className="videogamesrow">
        {videogamesrow}
      </div>
      <Loadmorecont fetchMore={fetchMore} setFetchMore={setFetchMore} complete={length === videoGames?.length}/>
    </div>
  )
};
export default Videogames;
