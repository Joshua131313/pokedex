import React from "react";
import PokeBtn from "../../../../../components/Button/PokeBtn";
import Filterbar from "./Filterbar";

const Searchbar = ({ search, setSearch, handleSearch, searchLoading, startEnd, setStartEnd, order, setOrder, dimension, setDimension, listView, setListView }) => {
  return (
    <div className="flexcol seabar">
       <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="searchbar"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="searchinput"
        placeholder="Search Pokemon"
      />
      <PokeBtn searchLoading={searchLoading} handleClick={()=> handleSearch()} />
    </form>
      <Filterbar   
          dimension={dimension}
          setDimension={setDimension}        
          order={order} 
          setOrder={setOrder} 
          startEnd={startEnd}
          setStartEnd={setStartEnd}
          listView={listView} 
          setListView={setListView}/>
    </div>
  );
};
export default Searchbar;
