import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const useGetTypes = () => {
  const types = [
    {
        "name": "normal",
        "url": "https://pokeapi.co/api/v2/type/1/"
    },
    {
        "name": "fighting",
        "url": "https://pokeapi.co/api/v2/type/2/"
    },
    {
        "name": "flying",
        "url": "https://pokeapi.co/api/v2/type/3/"
    },
    {
        "name": "poison",
        "url": "https://pokeapi.co/api/v2/type/4/"
    },
    {
        "name": "ground",
        "url": "https://pokeapi.co/api/v2/type/5/"
    },
    {
        "name": "rock",
        "url": "https://pokeapi.co/api/v2/type/6/"
    },
    {
        "name": "bug",
        "url": "https://pokeapi.co/api/v2/type/7/"
    },
    {
        "name": "ghost",
        "url": "https://pokeapi.co/api/v2/type/8/"
    },
    {
        "name": "steel",
        "url": "https://pokeapi.co/api/v2/type/9/"
    },
    {
        "name": "fire",
        "url": "https://pokeapi.co/api/v2/type/10/"
    },
    {
        "name": "water",
        "url": "https://pokeapi.co/api/v2/type/11/"
    },
    {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/"
    },
    {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
    },
    {
        "name": "psychic",
        "url": "https://pokeapi.co/api/v2/type/14/"
    },
    {
        "name": "ice",
        "url": "https://pokeapi.co/api/v2/type/15/"
    },
    {
        "name": "dragon",
        "url": "https://pokeapi.co/api/v2/type/16/"
    },
    {
        "name": "dark",
        "url": "https://pokeapi.co/api/v2/type/17/"
    },
    {
        "name": "fairy",
        "url": "https://pokeapi.co/api/v2/type/18/"
    },
    {
        "name": "unknown",
        "url": "https://pokeapi.co/api/v2/type/10001/"
    },
    {
        "name": "shadow",
        "url": "https://pokeapi.co/api/v2/type/10002/"
    }
 ]

  // useEffect(() => {
  //   setTypes(JSON.parse(localStorage.getItem("types")) || []);
  // }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("types")) {
  //     axios.get(`https://pokeapi.co/api/v2/type`).then((results) => {
  //       setTypes(results.data.results);
  //     });
  //   }
  // }, [types]);
  // useEffect(() => {
  //   try {
  //     localStorage.setItem("types", JSON.stringify(types));
  //   } catch (e) {}
  // }, [types]);

  return types;
};
export default useGetTypes;
