import React, { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../../ContextAPI";
import useGetPokemonDetails from "../../services/GetPokemonDetails";
import useSetSelectedPoke from "../../services/SetSelectedPoke";
import { getCardSizes } from "../../utils/Functions";
import ImgLoaded from "../Imgloaded/Imgloaded";
import "./Pokemoncard.css";
import Pokemoncardinfo from "./Pokemoncardinfo";

const Pokemoncard = (props) => {
  const { loading, details, dimension, ignoreInline } = props;
  let pokename = details
    ? ""
    : props.pokemon.name
    ? props.pokemon.name
    : props.pokemon.pokemon.name;

  const pokemon = useGetPokemonDetails({ pokemon: pokename, details });
  const { selectedPoke, setSelectedPoke, setHidePokeDetails, hidePokeDetails } =
    useContext(StoreContext);

  // useEffect(()=> {
  //     if(selectedPoke.id) {
  //       setHidePokeDetails(false)
  //     }
  // }, [selectedPoke])
  const returnWidth = () => {
    if (ignoreInline) {
      return null;
    } else {
      return (
        ((dimension.max - dimension.min) * dimension.value) / 100 +
        dimension.min
      );
    }
  };
  const handleActivePoke = useSetSelectedPoke({ pokemon });
  return (
    <>
      {pokemon?.sprites?.other.home.front_default ?
        <div
          style={{
            width: returnWidth(),
            height: ignoreInline ? "" : returnWidth() * 0.6,
            borderRadius: getCardSizes(returnWidth(), 10, 250, ignoreInline),
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setHidePokeDetails(true);
          }}
          className={`pokemoncard ${
            selectedPoke && selectedPoke.some((x) => x.id === pokemon.id)
              ? "selectedpokecard"
              : ""
          }`}
          onClick={() => {
            handleActivePoke();
            setHidePokeDetails(false);
          }}
        >
          <Pokemoncardinfo
            ignoreInline={ignoreInline}
            width={returnWidth()}
            dimension={dimension}
            pokemon={pokemon}
          />
        </div>
        : ''
      }
    </>
  );
};
export default Pokemoncard;
