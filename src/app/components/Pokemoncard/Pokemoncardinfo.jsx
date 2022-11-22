import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../ContextAPI";
import { determineColor, getCardSizes } from "../../utils/Functions";
import ImgLoaded from "../Imgloaded/Imgloaded";

const Pokemoncardinfo = (props) => {
  const {
    pokemon,
    classNameImg,
    dimension,
    width,
    isNotLink,
    ignoreInline
  } = props;
  const { shinyArray, setShinyArray, setHidePokeDetails } = useContext(
    StoreContext
  );
  const [imgKey, setImgKey] = useState("front_default");
  let defaultwidth = 250;
  let sizes = (val) => {
    return getCardSizes(width, val, defaultwidth, ignoreInline);
  };
  const handleShinyArray = () => {
    let tempState = [...shinyArray];
    if (tempState.includes(pokemon.id)) {
      let index = tempState.indexOf(pokemon.id);
      tempState.splice(index, 1);
    } else {
      tempState.push(pokemon.id);
    }
    setShinyArray([...tempState]);
  };
  const typesrow = pokemon?.types?.map((type) => {
    return (
      <div
        className="pokemontype"
        style={{
          background: determineColor(type.type.name),
          paddingLeft: sizes(5),
          paddingRight: sizes(5),
          paddingTop: sizes(2),
          paddingBottom: sizes(2),
          borderRadius: `${sizes(5)}`
        }}
      >
        <span style={{ fontSize: sizes(12) }}>{type.type.name}</span>
      </div>
    );
  });
  const handleImg = () => {
    if (shinyArray?.includes(pokemon?.id)) {
      return pokemon?.sprites?.other.home.front_shiny;
    } else {
      return pokemon?.sprites?.other.home.front_default;
    }
  };
  let LinkTag = isNotLink ? "span" : Link;

  return (
    <>
      <i
        className={`${
          !shinyArray?.includes(pokemon?.id) ? "fal" : "fa"
        } fa-sparkles shinyicon`}
        onClick={(e) => {
          e.stopPropagation();
          handleShinyArray();
        }}
        style={{
          fontSize: sizes(16),
          top: sizes(15),
          right: sizes(15)
        }}
      ></i>
      <ImgLoaded
        sizes={sizes}
        width={sizes(100)}
        dimension={dimension}
        className={classNameImg}
        img={handleImg()}
      />
      <div className="flexcol pokemoncardinfo" style={{ marginTop: sizes(35) }}>
        {pokemon?.id && (
          <>
            <span className="pokemonid" style={{ fontSize: sizes(15) }}>
              #{pokemon.id}
            </span>
            <LinkTag
              to={{
                pathname: `/pokedex/pokemon&${pokemon.id}`,
                state: pokemon
              }}
              onClick={(e) => {
                e.stopPropagation();
                setHidePokeDetails(true);
              }}
              className="pokename"
              style={{
                marginBottom: sizes(10),
                fontSize: sizes(16)
              }}
            >
              {pokemon.name}
            </LinkTag>
            <div className="flexrow types">{typesrow}</div>
          </>
        )}
      </div>
    </>
  );
};
export default Pokemoncardinfo;
