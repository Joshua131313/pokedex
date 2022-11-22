import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { StoreContext } from "../../../../../ContextAPI";
import Loadmorecont from "../../../../components/Loadmorecont";
import Pokemoncard from "../../../../components/Pokemoncard/Pokemoncard";
import useGetPokemon from "../../../../services/GetPokemon";
import { clean } from "../../../../utils/Functions";
import useLocalStorage from "../../../../utils/useLocalStorage";
import Searchbar from "./Parts/Searchbar";


const Pokedex = () => {
  const { addNoti, searchResult, setSearchResult } = useContext(StoreContext);
  const [limit, setLimit] = useState(40);
  const [order, setOrder] = useLocalStorage('order', 'asc');
  const [listView, setListView] = useLocalStorage('listView', 'icons')
  const [startEnd, setStartEnd] = useState({ start: 0, end: 40 });
  const listInnerRef = useRef();
  const [scrolledBtm, setScrolledBtm] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const { pokemon, length } = useGetPokemon({
    limit: startEnd.end - startEnd.start,
    offset: startEnd.start,
    end: startEnd.end,
    scrolledBtm,
    setScrolledBtm,
    order,
    fetchMore,
    setFetchMore
  });
  const [search, setSearch] = useState("");
  const pattern = new RegExp("\\b" + clean(search), "i");
  const [searchLoading, setSearchLoading] = useState(false);
  const [dimension, setDimension] = useState({ value: localStorage.getItem('dimension') || 40, max: 1000, min: 15 });

  //  150 to 400
  const pokemonrow = pokemon
    ?.filter((x) =>  pattern.test(clean(x.name ? x.name : x.pokemon.name)))
    .map((pokemon) => {
      return <Pokemoncard ignoreInline={listView === 'list'} dimension={dimension} pokemon={pokemon} />;
    });
  const searchResultRow = searchResult
    ?.filter((x) => pattern.test(clean(x.name)))
    .map((result) => {
      return <Pokemoncard ignoreInline={listView === 'list'} dimension={dimension} details={result} />;
    });

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight + 50 > scrollHeight ) {
  //       setScrolledBtm(true)
  //     }
  //   }
  // };
  const handleSearch = () => {
    if (search && !searchResult.some((x) => x.name === search)) {
      setSearchLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        .then((result) => {
          setSearchResult((prev) => [...prev, result.data]);
          setSearchLoading(false);
        })
        .catch(() => {
          addNoti("", "Invalid Pokemon name", true);
          setSearchLoading(false);
        });
    }
  };
  useEffect(()=> {
    localStorage.setItem('dimension', dimension.value)
  }, [dimension])

  return (
    <div className="pokedexpage page" ref={listInnerRef}>
      <Searchbar
        listView={listView} 
        setListView={setListView}
        startEnd={startEnd}
        setStartEnd={setStartEnd}
        searchLoading={searchLoading}
        search={search}
        setSearch={setSearch}
        order={order}
        setOrder={setOrder}
        handleSearch={() => handleSearch()}
        dimension={dimension}
        setDimension={setDimension}
      />
      <div className={`pokemontcontainers ${listView === 'list'?'pokecontlist':''}`}>
        {searchResultRow.length > 0 && (
          <>
            <h3>Search results</h3>
            <div className={`pokemoncont ${listView==='list'?'listviewpoke':''}`}>{searchResultRow}</div>
          </>
        )}
        <h3>All Pokemon</h3>
        <div className={`pokemoncont ${listView==='list'?'listviewpoke':''}`}>{pokemonrow}</div>
        <Loadmorecont
          pokedex
          fetchMore={fetchMore}
          setFetchMore={setFetchMore}
          complete={length === pokemonrow.length || length === Infinity}
        />
      </div>
    </div>
  );
};
export default Pokedex;
